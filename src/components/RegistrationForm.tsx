import React, { useState } from "react";
import { sendEmail } from "@/utils/emailconfig";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";

export default function RegistrationForm() {
  const { incrementCounter } = useWaitlistCounter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const registrationData = {
      firstName: formData.get("first_name") as string,
      lastName: formData.get("last_name") as string,
      email: formData.get("from_email") as string,
      contactNumber: formData.get("contact_number") as string,
      country: formData.get("country") as string,
    };

    try {
      // Send to Google Sheets
      await fetch('https://script.google.com/macros/s/AKfycbw27vL5_kC_lXcbnVq2xyC1fdbRkSbVh0mvYwPCpwv-JGYkdRwxIOMpPbsWLCFJyM8GCQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: registrationData.firstName,
          lastName: registrationData.lastName,
          email: registrationData.email,
          contact: registrationData.contactNumber,
          country: registrationData.country,
        }),
      });

      // Send email via EmailJS
      const emailResult = await sendEmail({
        ...registrationData,
        source: 'Plan Registration'
      });
      
      if (!emailResult.success) {
        throw emailResult.error;
      }

      incrementCounter(); // Increment the waitlist counter
      toast.success("Registration successful! We'll contact you shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Registration failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          type="text"
          name="first_name"
          placeholder="Enter your first name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="last_name"
          type="text"
          name="last_name"
          placeholder="Enter your last name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="from_email">Email</Label>
        <Input
          id="from_email"
          type="email"
          name="from_email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_number">Contact Number</Label>
        <Input
          id="contact_number"
          type="text"
          name="contact_number"
          placeholder="Enter your contact number"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          type="text"
          name="country"
          placeholder="Enter your country"
          required
        />
      </div>

      <Button
        type="submit" 
        className="w-full py-6 text-base font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
