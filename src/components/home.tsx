import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "./auth/LoginForm";
import ForgotPasswordForm from "./auth/ForgotPasswordForm";
import DashboardLayout from "./dashboard/DashboardLayout";
import { useAuth } from "@/lib/auth";

const Home = () => {
  const { isAuthenticated, login, requestPasswordReset } = useAuth();
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  const [resetSuccess, setResetSuccess] = React.useState("");

  const handleLogin = async (data: {
    memberNumber: string;
    password: string;
  }) => {
    setIsLoading(true);
    setError("");

    const { error: loginError } = await login(data.memberNumber, data.password);

    if (loginError) {
      setError(loginError.message);
    }

    setIsLoading(false);
  };

  const handleForgotPassword = async (memberNumber: string) => {
    setIsLoading(true);
    setError("");
    setResetSuccess("");

    const { error: resetError } = await requestPasswordReset(memberNumber);

    if (resetError) {
      setError(resetError.message);
    } else {
      setResetSuccess(
        "If your member number is valid, you will receive an email with password reset instructions.",
      );
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetSuccess("");
      }, 5000);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-background dark">
      {!isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
          <Card className="w-full max-w-[1200px] mx-4 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left side - Branding */}
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-primary/5 rounded-l-lg">
                  <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                    Member Portal
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    Access your membership information, stay updated with
                    announcements, and manage your payments all in one place.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">Secure Access</h3>
                        <p className="text-sm text-muted-foreground">
                          Your data is protected with industry-standard
                          encryption
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">Instant Updates</h3>
                        <p className="text-sm text-muted-foreground">
                          Stay informed with real-time notifications
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">Easy Payments</h3>
                        <p className="text-sm text-muted-foreground">
                          Manage your membership fees hassle-free
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Login/Forgot Password Form */}
                <div className="p-8 lg:p-12 flex items-center justify-center">
                  {showForgotPassword ? (
                    <ForgotPasswordForm
                      onSubmit={handleForgotPassword}
                      onCancel={() => setShowForgotPassword(false)}
                      isLoading={isLoading}
                      error={error}
                      success={resetSuccess}
                    />
                  ) : (
                    <LoginForm
                      onSubmit={handleLogin}
                      onForgotPassword={() => setShowForgotPassword(true)}
                      isLoading={isLoading}
                      error={error}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <DashboardLayout />
      )}
    </div>
  );
};

export default Home;
