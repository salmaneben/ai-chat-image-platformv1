import React from 'react';
import { Check, Zap } from 'lucide-react';

const Upgrade = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold dark:text-white">Upgrade to Pro</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Get unlimited access to all features</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`rounded-xl p-8 ${
            plan.featured 
              ? 'bg-gradient-to-br from-primary-500 to-blue-600 text-white ring-2 ring-primary-500' 
              : 'bg-white dark:bg-dark-paper'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-xl font-bold ${plan.featured ? 'text-white' : 'dark:text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1 ${plan.featured ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
                  {plan.description}
                </p>
              </div>
              {plan.featured && <Zap className="w-6 h-6" />}
            </div>

            <div className="mt-6">
              <p className={`text-3xl font-bold ${plan.featured ? 'text-white' : 'dark:text-white'}`}>
                ${plan.price}
                <span className={`text-base font-normal ${plan.featured ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
                  /month
                </span>
              </p>
            </div>

            <ul className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className={`w-5 h-5 ${plan.featured ? 'text-white' : 'text-primary-500'}`} />
                  <span className={plan.featured ? 'text-white' : 'dark:text-gray-300'}>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`mt-8 w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              plan.featured
                ? 'bg-white text-primary-600 hover:bg-gray-50'
                : 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600'
            }`}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const plans = [
  {
    name: 'Free',
    description: 'Basic features for personal use',
    price: '0',
    features: [
      '10 generations per day',
      'Basic text generation',
      'Basic image generation',
      '720p image resolution',
      'Email support'
    ]
  },
  {
    name: 'Pro',
    description: 'Advanced features for professionals',
    price: '29',
    featured: true,
    features: [
      'Unlimited generations',
      'Advanced text generation',
      'Advanced image generation',
      '4K image resolution',
      'Priority support',
      'API access'
    ]
  }
];

export default Upgrade;