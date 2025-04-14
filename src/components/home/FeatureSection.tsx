
import { Truck, ShieldCheck, CreditCard, RefreshCw } from "lucide-react";

const features = [
  {
    name: "Free Shipping",
    description: "Free shipping on all orders over $50",
    icon: Truck,
  },
  {
    name: "Secure Payments",
    description: "We use encrypted SSL security",
    icon: ShieldCheck,
  },
  {
    name: "Easy Returns",
    description: "30 days return policy",
    icon: RefreshCw,
  },
  {
    name: "Various Payment Methods",
    description: "Credit cards, PayPal, and more",
    icon: CreditCard,
  },
];

const FeatureSection = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Why Choose Us
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to shop online
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We provide the best online shopping experience with features designed to make your life easier.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center">{feature.name}</h3>
                <p className="mt-2 text-base text-gray-500 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
