import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, KeyRound, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LoginFormProps {
  onSubmit?: (data: { memberNumber: string; password: string }) => void;
  onForgotPassword?: () => void;
  isLoading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit = () => {},
  onForgotPassword = () => {},
  isLoading = false,
  error = "",
}) => {
  const [memberNumber, setMemberNumber] = React.useState("TM10003");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ memberNumber, password });
  };

  return (
    <div className="w-full max-w-[400px] p-4 bg-background">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-center">
            <div className="text-lg font-medium mb-2 text-primary/90">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <div className="text-2xl font-bold mb-2">
              Pakistan Welfare Association
            </div>
            <div className="text-sm text-muted-foreground">
              Welcome to our community platform. Please login with your member
              number.
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="memberNumber">Member Number</Label>
              <div className="relative">
                <Input
                  id="memberNumber"
                  type="text"
                  placeholder="Enter your member number"
                  value={memberNumber}
                  onChange={(e) => setMemberNumber(e.target.value)}
                  className="pl-10"
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="link"
                        className="px-0 text-sm font-normal"
                        onClick={onForgotPassword}
                      >
                        Forgot Password?
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to reset your password</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
                <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className="mt-6 text-center space-y-4">
              <div className="text-sm text-muted-foreground">
                Need Help?{" "}
                <a href="#" className="text-primary hover:underline">
                  Contact Support
                </a>
              </div>
              <div className="text-xs text-muted-foreground">
                By logging in, you agree to the PWA Collector Member
                Responsibilities and Pakistan Welfare Association Membership
                Terms
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
