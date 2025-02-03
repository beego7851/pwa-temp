import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, User } from "lucide-react";

interface ForgotPasswordFormProps {
  onSubmit: (memberNumber: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string;
  success?: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  error = "",
  success = "",
}) => {
  const [memberNumber, setMemberNumber] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(memberNumber);
  };

  return (
    <div className="w-full max-w-[400px] p-4">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
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
                  disabled={isLoading}
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-800 rounded-md p-3 text-sm">
                {success}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
                disabled={isLoading}
              >
                Back to Login
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Sending..." : "Reset Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
