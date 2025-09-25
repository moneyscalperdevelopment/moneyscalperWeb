import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function RegistrationForm() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    // Debugging: log values before sending
    const fd = new FormData(formRef.current);
    for (const [key, value] of fd.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",   // replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID",  // replace with your EmailJS template ID
        formRef.current,
        "YOUR_PUBLIC_KEY"    // replace with your EmailJS public key
      );
      alert("✅ Registration sent successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error("❌ EmailJS Error:", error);
      alert("Failed to send registration. Check console for details.");
    }
  };

  return (
    <div className="registration-popup">
      <form ref={formRef} onSubmit={handleSubmit} className="registration-form">
        <input type="hidden" name="to_name" value="Site Admin" />

        <div className="input-span">
          <label className="label" htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className="input-span">
          <label className="label" htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            placeholder="Enter your last name"
            required
          />
        </div>

        <div className="input-span">
          <label className="label" htmlFor="from_email">Email</label>
          <input
            id="from_email"
            type="email"
            name="from_email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-span">
          <label className="label" htmlFor="contact_number">Contact Number</label>
          <input
            id="contact_number"
            type="text"
            name="contact_number"
            placeholder="Enter your contact number"
            required
          />
        </div>

        <div className="input-span">
          <label className="label" htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            name="country"
            placeholder="Enter your country"
            required
          />
        </div>

        <div className="input-span">
          <label className="label" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Write your message..."
          ></textarea>
        </div>

        <button type="submit" className="submit">Register</button>
      </form>
    </div>
  );
}
