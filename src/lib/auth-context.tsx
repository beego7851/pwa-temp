import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";
import { useAuthStore } from "./stores/auth-store";

type AuthContextType = {
  isAuthenticated: boolean;
  user: any;
  login: (memberNumber: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  loading: boolean;
  requestPasswordReset: (memberNumber: string) => Promise<{ error: any }>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", { event, session });
      if (session?.user) {
        setAuth(
          true,
          session.user,
          session.user.user_metadata?.member_number || null,
        );
      } else {
        clearAuth();
      }
      setLoading(false);
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session);
      if (session?.user) {
        setAuth(
          true,
          session.user,
          session.user.user_metadata?.member_number || null,
        );
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (memberNumber: string, password: string) => {
    try {
      console.log("Attempting login for member:", memberNumber);

      const { data: memberData, error: memberError } = await supabase
        .from("members")
        .select("email")
        .eq("member_number", memberNumber)
        .single();

      console.log("Member lookup result:", { memberData, memberError });

      if (memberError || !memberData?.email) {
        console.error("Member lookup failed:", memberError);
        return { error: { message: "Invalid member number" } };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: memberData.email,
        password: password,
      });

      console.log("Sign in result:", { data, error });

      if (error) {
        console.error("Sign in failed:", error);
        await supabase.rpc("handle_failed_login", {
          member_number: memberNumber,
        });
        return { error };
      }

      // Update user metadata with member number
      if (data?.user) {
        await supabase.auth.updateUser({
          data: { member_number: memberNumber },
        });
      }

      await supabase.rpc("reset_failed_login", { member_number: memberNumber });
      return { error: null };
    } catch (error) {
      console.error("Login error:", error);
      return { error };
    }
  };

  const requestPasswordReset = async (memberNumber: string) => {
    try {
      const { data: memberData, error: memberError } = await supabase
        .from("members")
        .select("email")
        .eq("member_number", memberNumber)
        .single();

      if (memberError || !memberData?.email) {
        return { error: { message: "Invalid member number" } };
      }

      const { data: tokenData, error: tokenError } = await supabase.rpc(
        "generate_password_reset_token",
        {
          p_member_number: memberNumber,
          p_token_type: "password_reset",
        },
      );

      if (tokenError) {
        return { error: tokenError };
      }

      await supabase.from("email_logs").insert({
        recipient_email: memberData.email,
        subject: "Password Reset Request",
        email_type: "password_reset",
        member_number: memberNumber,
        status: "pending",
        metadata: {
          token: tokenData,
          reset_url: `${window.location.origin}/reset-password?token=${tokenData}`,
        },
      });

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    clearAuth();
    navigate("/");
  };

  const { isAuthenticated, user } = useAuthStore();

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    requestPasswordReset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
