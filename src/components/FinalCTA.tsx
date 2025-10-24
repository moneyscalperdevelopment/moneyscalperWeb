import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";
const FinalCTA = () => {
  const { incrementCounter } = useWaitlistCounter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const registrationData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      contact: formData.get("contact") as string,
      message: formData.get("message") as string,
    };
    
    try {
      // Send to Google Sheets
      await fetch('https://script.google.com/macros/s/AKfycbxvL-IIs2fB_r5UlG3gbGhzgNsBv7_OafPC1P65BLD_9wv4aoLnYodAv2QWPJuSUN0Bhg/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'Contact Us',
          ...registrationData,
        }),
      });

      // Send email via EmailJS
      await emailjs.send(
        'service_tdx4qi4',
        'template_rak8f58',
        {
          source: 'Contact Us',
          from_name: registrationData.name,
          from_email: registrationData.email,
          contact_number: registrationData.contact,
          message: registrationData.message,
          to_name: 'Money Scalper'
        },
        'XtWp493g7vwVe6q_-'
      );
      
      incrementCounter(); // Increment the waitlist counter
      toast.success("Message sent successfully! We'll get back to you soon.");
      setIsDialogOpen(false);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent py-2 sm:py-3 md:py-4 px-2">
            Contact Us
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto px-3">
            Have questions? Get in touch with us and we'll respond as soon as possible.
          </p>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button size="lg" className="text-sm sm:text-base md:text-lg px-6 sm:px-7 md:px-8 py-4 sm:py-5 md:py-6 group">
                  Contact Us
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto w-[95%] sm:w-full">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Get In Touch
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" name="contact" type="tel" placeholder="+1 234 567 8900" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea id="message" name="message" placeholder="Write your message here..." rows={4} required />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <p className="mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm text-muted-foreground px-3">
            We'll respond within 24 hours • Available 24/7 • Your privacy is protected
          </p>
        </motion.div>
      </div>
    </section>;
};
export default FinalCTA;