import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function RegistrationForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      );
      toast({
        title: "Registration Successful!",
        description: "We'll contact you shortly.",
      });
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="to_name" value="Site Admin" />

      <div className="space-y-2">
        <Label htmlFor="first_name" className="text-green-400">First Name</Label>
        <Input
          id="first_name"
          type="text"
          name="first_name"
          placeholder="Enter your first name"
          required
          className="bg-white text-black border-0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="last_name" className="text-green-400">Last Name</Label>
        <Input
          id="last_name"
          type="text"
          name="last_name"
          placeholder="Enter your last name"
          required
          className="bg-white text-black border-0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="from_email" className="text-green-400">Email</Label>
        <Input
          id="from_email"
          type="email"
          name="from_email"
          placeholder="Enter your email"
          required
          className="bg-muted text-foreground border-0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact_number" className="text-green-400">Contact Number</Label>
        <Input
          id="contact_number"
          type="text"
          name="contact_number"
          placeholder="Enter your contact number"
          required
          className="bg-white text-black border-0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="country" className="text-green-400">Country</Label>
        <Input
          id="country"
          type="text"
          name="country"
          placeholder="Enter your country"
          required
          className="bg-white text-black border-0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-green-400">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Write your message..."
          className="bg-white text-black border-0 resize-none"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-muted hover:bg-muted/80 text-foreground rounded-full py-6 text-base font-semibold"
      >
        Register
      </Button>
    </form>
  );
}
