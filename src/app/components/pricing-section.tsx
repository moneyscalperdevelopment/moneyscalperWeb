export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "₹99",
      period: "/month",
      description: "For beginners testing the waters",
      features: [
        "6 Foundation Videos",
        "10 Mock Tests/month",
        "Basic Journal",
        "Community Access"
      ],
    },
    {
      name: "Growth",
      price: "₹299",
      period: "/month",
      badge: "Most Popular",
      description: "For serious traders",
      features: [
        "Everything in Starter",
        "Unlimited Mock Tests",
        "Daily Expert Setups",
        "AI Trade Feedback",
        "LIVE Saturday Class"
      ],
      highlighted: true
    },
    {
      name: "Pro",
      price: "₹499",
      period: "/month",
      description: "For professionals",
      features: [
        "Everything in Growth",
        "Live Market Data",
        "Priority Support",
        "1-on-1 with Piyush"
      ],
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="max-w-3xl mb-16">
          <h2 className="text-5xl mb-6 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600">
            Cancel anytime. 14-day money-back guarantee.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-3xl p-8 transition-all relative ${
                plan.highlighted
                  ? "bg-gray-900 text-white shadow-2xl scale-105"
                  : "bg-white border border-gray-200 hover:shadow-lg"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-teal-500 text-white px-4 py-1 rounded-full text-xs">
                    {plan.badge}
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={`text-2xl mb-2 ${plan.highlighted ? 'text-white' : ''}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? 'text-gray-300' : 'text-gray-600'}>
                    {plan.period}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={plan.highlighted ? 'text-teal-400' : 'text-teal-600'}>✓</span>
                    <span className={`text-sm ${plan.highlighted ? 'text-gray-200' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-3 px-6 rounded-xl transition-all ${
                  plan.highlighted
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
