

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type PassengerInfo = {
  fullName: string;
  phone: string;
  email: string;
};

type PaymentInfo = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export default function PassengerFlow() {
  const [passenger, setPassenger] = useState<PassengerInfo>({
    fullName: "",
    phone: "",
    email: "",
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [step, setStep] = useState<1 | 2>(1);

  // -----------------------
  // Handlers
  // -----------------------

  const handlePassengerChange = (field: keyof PassengerInfo, value: string) => {
    setPassenger({ ...passenger, [field]: value });
  };

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    setPayment({ ...payment, [field]: value });
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = () => {
    // ⛔ No backend — just front-end
    console.log("Passenger Info:", passenger);
    console.log("Payment Info:", payment);
    alert("Your booking was submitted (demo mode, no backend).");
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Passenger Information</CardTitle>
          <CardDescription>
            Please enter your personal and payment details.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* ----------------------- */}
          {/* Step 1: Passenger Info */}
          {/* ----------------------- */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={passenger.fullName}
                  onChange={(e) =>
                    handlePassengerChange("fullName", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="07..."
                  value={passenger.phone}
                  onChange={(e) =>
                    handlePassengerChange("phone", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="example@gmail.com"
                  value={passenger.email}
                  onChange={(e) =>
                    handlePassengerChange("email", e.target.value)
                  }
                />
              </div>

              <Button className="w-full mt-4" onClick={handleNext}>
                Continue to Payment
              </Button>
            </div>
          )}

          {/* ----------------------- */}
          {/* Step 2: Payment Info */}
          {/* ----------------------- */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  placeholder="Name on the card"
                  value={payment.cardName}
                  onChange={(e) =>
                    handlePaymentChange("cardName", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="xxxx xxxx xxxx xxxx"
                  value={payment.cardNumber}
                  onChange={(e) =>
                    handlePaymentChange("cardNumber", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={payment.expiry}
                    onChange={(e) =>
                      handlePaymentChange("expiry", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    value={payment.cvv}
                    onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>

                <Button onClick={handleSubmit}>Confirm Booking</Button>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Note: This is demo mode (no backend).
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
