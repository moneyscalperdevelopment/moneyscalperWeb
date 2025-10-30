import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ROLE_OPTIONS = [
  'Backend Engineer',
  'Blockchain Developer',
  'Community Manager',
  'Content Writer',
  'Customer Support Executive',
  'Data Analyst',
  'Front-End Developer',
  'Graphic Designer',
  'Junior QA Engineer',
  'Marketing Associate',
  'Product Designer (UI/UX)',
  'Product Manager',
  'Sales Executive',
  'Security Engineer',
  'Social Media Manager',
  'Video Editor'
].sort((a, b) => a.localeCompare(b));

export default function CareerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const careerData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      from_email: formData.get("from_email") as string,
      contact_number: formData.get("contact_number") as string,
      country: formData.get("country") as string,
      city: formData.get("city") as string,
      dob: formData.get("dob") as string,
      position_applying_for: formData.get("position_applying_for") as string,
      work_type: formData.get("work_type") as string,
      expected_salary: formData.get("expected_salary") as string,
      qualification: formData.get("qualification") as string,
      college: formData.get("college") as string,
      graduation_year: formData.get("graduation_year") as string,
      certifications: formData.get("certifications") as string,
      has_experience: formData.get("has_experience") as string,
      previous_company: formData.get("previous_company") as string,
      previous_role: formData.get("previous_role") as string,
      employment_duration: formData.get("employment_duration") as string,
      key_responsibilities: formData.get("key_responsibilities") as string,
      skills: formData.get("skills") as string,
      tools: formData.get("tools") as string,
      role_description: formData.get("role_description") as string,
      motivation: formData.get("motivation") as string,
      why_good_fit: formData.get("why_good_fit") as string,
      portfolio_url: formData.get("portfolio_url") as string,
      start_date: formData.get("start_date") as string,
      reference: formData.get("reference") as string,
      to_name: 'Money Scalper HR Team'
    };

    try {
      // Send email via EmailJS
      await emailjs.send(
        'service_o5z56fm',
        'template_ye0cf3c',
        careerData,
        'AnyGKIBS05v_ugsa4'
      );

      toast.success("Application submitted successfully! We'll contact you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Application Error:", error);
      toast.error("Application failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name *</Label>
            <Input
              id="first_name"
              name="first_name"
              placeholder="John"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name *</Label>
            <Input
              id="last_name"
              name="last_name"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from_email">Email *</Label>
            <Input
              id="from_email"
              type="email"
              name="from_email"
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_number">Contact Number *</Label>
            <Input
              id="contact_number"
              name="contact_number"
              placeholder="+91 9XXXXXXXXX"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City / Location *</Label>
            <Input
              id="city"
              name="city"
              placeholder="Jaipur"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              name="country"
              placeholder="India"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            name="dob"
          />
        </div>
      </div>

      {/* Role Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Role Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position_applying_for">Position Applying For *</Label>
            <select
              id="position_applying_for"
              name="position_applying_for"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select a role</option>
              {ROLE_OPTIONS.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="work_type">Preferred Work Type *</Label>
            <select
              id="work_type"
              name="work_type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select type</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expected_salary">Expected Salary / Stipend</Label>
            <Input
              id="expected_salary"
              name="expected_salary"
              placeholder="₹ / month"
            />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Education & Qualification</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="qualification">Highest Qualification *</Label>
            <Input
              id="qualification"
              name="qualification"
              placeholder="BCA / B.Tech / MBA"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="college">College / University *</Label>
            <Input
              id="college"
              name="college"
              placeholder="University name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="graduation_year">Graduation Year *</Label>
            <Input
              id="graduation_year"
              type="number"
              name="graduation_year"
              min="1980"
              max="2099"
              placeholder="2025"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certifications">Relevant Certifications</Label>
            <Input
              id="certifications"
              name="certifications"
              placeholder="Optional"
            />
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Professional Experience</h3>
        
        <div className="space-y-2">
          <Label htmlFor="has_experience">Do you have prior experience? *</Label>
          <select
            id="has_experience"
            name="has_experience"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="previous_company">Previous Company</Label>
            <Input
              id="previous_company"
              name="previous_company"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="previous_role">Role / Designation</Label>
            <Input
              id="previous_role"
              name="previous_role"
              placeholder=""
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employment_duration">Duration of Employment</Label>
          <Input
            id="employment_duration"
            name="employment_duration"
            placeholder="e.g., 2 years 3 months"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="key_responsibilities">Key Responsibilities</Label>
          <Textarea
            id="key_responsibilities"
            name="key_responsibilities"
            placeholder="Describe your main responsibilities"
            rows={3}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Skills & Tools</h3>
        
        <div className="space-y-2">
          <Label htmlFor="skills">Key Skills *</Label>
          <Input
            id="skills"
            name="skills"
            placeholder="e.g., Photoshop, Canva, HTML, Sales"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tools">Software / Tools Proficiency</Label>
          <Input
            id="tools"
            name="tools"
            placeholder="List tools you're proficient with"
          />
        </div>
      </div>

      {/* Motivation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Role Understanding & Motivation</h3>
        
        <div className="space-y-2">
          <Label htmlFor="role_description">Describe your role or how you can contribute *</Label>
          <Textarea
            id="role_description"
            name="role_description"
            placeholder="What did you do? Impact, tools, outcomes..."
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="motivation">Why do you want to work with us? *</Label>
          <Textarea
            id="motivation"
            name="motivation"
            placeholder="Tell us your motivation"
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="why_good_fit">What makes you a good fit for this role? *</Label>
          <Textarea
            id="why_good_fit"
            name="why_good_fit"
            placeholder="Explain why you're the right candidate"
            rows={3}
            required
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Additional Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="portfolio_url">LinkedIn / Portfolio URL</Label>
          <Input
            id="portfolio_url"
            type="url"
            name="portfolio_url"
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start_date">Available Start Date</Label>
            <Input
              id="start_date"
              type="date"
              name="start_date"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Reference</Label>
            <Input
              id="reference"
              name="reference"
              placeholder="If any"
            />
          </div>
        </div>
      </div>

      {/* Consent */}
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="consent_info"
            required
            className="mt-1"
          />
          <Label htmlFor="consent_info" className="cursor-pointer">
            I confirm that the information provided is true. *
          </Label>
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="consent_contact"
            required
            className="mt-1"
          />
          <Label htmlFor="consent_contact" className="cursor-pointer">
            I agree to be contacted via phone/email. *
          </Label>
        </div>
      </div>

      <Button
        type="submit" 
        className="w-full py-6 text-base font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting Application..." : "Submit Application"}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        We typically respond within 2–3 business days.
      </p>
    </form>
  );
}
