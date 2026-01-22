import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { IMAGES } from "@/config/images";
import emailjs from "@emailjs/browser";
import { useState } from "react";


export function HeroSection() {
const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const form = e.currentTarget;
  //   const formData = new FormData(form);

  //   const templateParams = {
  //     name: formData.get("name"),
  //     email: formData.get("email"),
  //     phone: formData.get("phone"),
  //   };

  //   try {
  //     await emailjs.send(
  //       "service_tdx4qi4",
  //       "template_rak8f58",
  //       templateParams,
  //       "XtWp493g7vwVe6q_-"
  //     );

  //     alert("Thanks! We will contact you soon for your FREE session.");
  //     form.reset();
  //   } catch (error) {
  //     console.error("EmailJS Error:", error);
  //     alert("Something went wrong. Please try again.");
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const templateParams = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    try {
      await emailjs.send(
        "service_tdx4qi4",
        "template_rak8f58",
        templateParams,
        "XtWp493g7vwVe6q_-"
      );
      // await emailjs.send(
      //   process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      //   process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      //   templateParams,
      //   process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      // );

      alert("Thanks! We will contact you soon for your FREE session.");
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-20 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={IMAGES.hero.background}
          alt="Trading Workspace with Multiple Monitors"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

          {/* Left */}
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl text-white">
              From Loss to Profit in{" "}
              <span className="bg-gradient-to-r from-teal-400 to-[#0a9957] bg-clip-text text-transparent">
                4 Weeks
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Trading सीखो बिना real money खोए. Expert setups daily + unlimited mock tests + AI feedback on every trade.
            </p>
          </div>

          {/* Form */}
          <div id="book-session">
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-700">
              <h3 className="text-2xl text-white mb-2">Book your FREE session</h3>
              <p className="text-gray-400 mb-6">Learn from 11 years of trading experience</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  name="name"
                  required
                  placeholder="Full Name"
                  className="w-full px-4 py-4 rounded-xl bg-black border border-gray-700 text-white"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full px-4 py-4 rounded-xl bg-black border border-gray-700 text-white"
                />

                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number"
                  className="w-full px-4 py-4 rounded-xl bg-black border border-gray-700 text-white"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-8 rounded-xl text-base transition-all duration-300
                     ${loading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-teal-600 to-[#0a9957] hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50"}
                        text-white flex items-center justify-center gap-3`}
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Submitting...
                    </>
                  ) : (
                    "Book FREE Session"
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
