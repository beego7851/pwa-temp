import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCard, DollarSign, History, AlertCircle } from "lucide-react";

interface PaymentSectionProps {
  currentBalance?: number;
  dueDate?: string;
  paymentHistory?: Array<{
    date: string;
    amount: number;
    status: "completed" | "pending" | "failed";
  }>;
}

const PaymentSection = ({
  currentBalance = 250.0,
  dueDate = "2024-05-01",
  paymentHistory = [
    { date: "2024-03-15", amount: 150.0, status: "completed" },
    { date: "2024-02-15", amount: 150.0, status: "completed" },
    { date: "2024-01-15", amount: 150.0, status: "completed" },
  ],
}: PaymentSectionProps) => {
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = React.useState(true);

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payment Management</h1>

      {/* Current Balance Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-6 w-6" />
            Current Balance
          </CardTitle>
          <CardDescription>Due by {dueDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">${currentBalance.toFixed(2)}</div>
          <Progress value={75} className="mt-4" />
          <p className="text-sm text-muted-foreground mt-2">
            75% of yearly dues paid
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setIsPaymentDialogOpen(true)}
            className="w-full"
          >
            Make a Payment
          </Button>
        </CardFooter>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-6 w-6" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{payment.date}</p>
                  <p className="text-sm text-muted-foreground">
                    ${payment.amount.toFixed(2)}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    payment.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : payment.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {payment.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make a Payment</DialogTitle>
            <DialogDescription>
              Enter your payment details below
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Payment Amount</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                type="number"
                defaultValue={currentBalance}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card">Card Number</Label>
              <div className="relative">
                <Input id="card" placeholder="1234 5678 9012 3456" />
                <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPaymentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsPaymentDialogOpen(false)}>
              Process Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentSection;
