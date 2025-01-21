import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  ImagePlus,
  FileText,
  ArrowRight,
  CheckCircle,
  Users,
  Globe,
  Award,
  Sparkles,
  Code,
  Cloud,
  Lock,
} from 'lucide-react';

// Features Data
const features = [
  {
    icon: Bot,
    title: 'Advanced AI Models',
    description: 'Powered by GPT-3.5 and DALL-E for exceptional content generation',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: ImagePlus,
    title: 'Image Generation',
    description: 'Create stunning visuals with state-of-the-art AI image generation',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FileText,
    title: 'Text Generation',
    description: 'Generate professional content for any use case instantly',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Code,
    title: 'API Integration',
    description: 'Seamless integration with your existing applications',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and data protection measures',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Scalable and reliable cloud-based processing',
    color: 'from-purple-500 to-pink-500',
  },
];

// Stats Data
const stats = [
  { icon: Users, value: '50K+', label: 'Active Users' },
  { icon: Globe, value: '150+', label: 'Countries' },
  { icon: Sparkles, value: '5M+', label: 'Generations' },
  { icon: Award, value: '99.9%', label: 'Uptime' },
];

// Pricing Plans Data
const plans = [
  {
    name: 'Free',
    price: '0',
    period: 'month',
    description: 'Perfect for trying out our platform',
    features: [
      '100 Text Generations/month',
      '50 Image Generations/month',
      'Basic Templates',
      'Community Support',
      'API Access (100 calls/day)',
      '720p Image Resolution',
    ],
  },
  {
    name: 'Pro',
    price: '29',
    period: 'month',
    description: 'Best for professionals and small teams',
    featured: true,
    features: [
      'Unlimited Text Generations',
      'Unlimited Image Generations',
      'Premium Templates',
      'Priority Support',
      'Full API Access',
      '4K Image Resolution',
      'Team Collaboration',
      'Advanced Analytics',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'year',
    description: 'For large organizations with custom needs',
    features: [
      'Custom AI Models',
      'Dedicated Infrastructure',
      'SLA Guarantee',
      '24/7 Support',
      'Custom Integration',
      'Advanced Analytics',
      'Security Audit Logs',
      'Custom Training',
    ],
  },
];

// Team Data
const team = [
  {
    name: 'Salmane ben yakhlaf',
    role: 'Co-Founder & CEO',
    image: 'https://avatars.githubusercontent.com/u/133282548?v=4',
    description: 'Visionary leader and technical expert driving platform innovation',
  },
  {
    name: 'EL MUSTAPHA LAKHLOUFI',
    role: 'Co-Founder & CTO',
    image: 'https://avatars.githubusercontent.com/u/111161472?v=4',
    description: 'Architect of our AI infrastructure and security systems',
  },
];

const Presentation = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll and animations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Bot className="h-7 w-7 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                AI Platform
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => document.getElementById('features').scrollIntoView()}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => document.getElementById('pricing').scrollIntoView()}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => document.getElementById('team').scrollIntoView()}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Team
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-primary-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 relative overflow-hidden">
        {/* Background Gradient & Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-primary-900/20 dark:to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241 / 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto" data-animate id="hero">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              Create Amazing Content with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                Artificial Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              Harness the power of advanced AI to generate high-quality text and images. Perfect for
              creators, marketers, and professionals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center group"
              >
                Start Creating Free
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center border border-gray-200 dark:border-gray-700"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white dark:bg-gray-800" data-animate id="stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-4 text-primary-600" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 relative overflow-hidden" data-animate id="features">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241 / 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Create
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                Amazing Content
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powerful features to help you generate, edit, and manage your content with ease
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 relative group"
                >
                  {/* Feature Icon */}
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Feature Content */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-600/0 to-blue-600/0 opacity-0 group-hover:opacity-10 transition-opacity" />
                </div>
              );
            })}
          </div>

          {/* Additional Features List */}
          <div className="mt-20 grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Advanced Technology',
                features: [
                  'State-of-the-art AI models',
                  'Real-time processing',
                  'Multi-language support',
                  'Content optimization',
                ],
              },
              {
                title: 'Enterprise Grade',
                features: [
                  'SOC 2 Type II certified',
                  '99.9% uptime guarantee',
                  'Advanced encryption',
                  'Dedicated support',
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-primary-600 shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-white dark:bg-gray-800" data-animate id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the perfect plan for your needs
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl ${
                  plan.featured
                    ? 'bg-gradient-to-b from-primary-600 to-blue-600 text-white scale-105 shadow-xl'
                    : 'bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white'
                }`}
              >
                {/* Featured Badge */}
                {plan.featured && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Content */}
                <div className="p-8">
                  {/* Plan Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className={plan.featured ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Plan Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      {typeof plan.price === 'number' ? (
                        <>
                          <span className="text-4xl font-bold">$</span>
                          <span className="text-5xl font-bold">{plan.price}</span>
                          <span className="text-lg ml-2">/{plan.period}</span>
                        </>
                      ) : (
                        <span className="text-4xl font-bold">{plan.price}</span>
                      )}
                    </div>
                  </div>

                  {/* Plan Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle
                          className={`h-5 w-5 shrink-0 ${
                            plan.featured ? 'text-white' : 'text-primary-600 dark:text-primary-400'
                          }`}
                        />
                        <span className={plan.featured ? 'text-white' : 'text-gray-600 dark:text-gray-300'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Plan CTA */}
                  <Link
                    to="/register"
                    className={`block w-full py-3 px-6 rounded-lg text-center font-medium transition-colors ${
                      plan.featured
                        ? 'bg-white text-primary-600 hover:bg-gray-50'
                        : 'bg-gradient-to-r from-primary-600 to-blue-600 text-white hover:opacity-90'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Link */}
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300">
              Have questions?{' '}
              <Link to="/faq" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                Check our FAQ
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 relative" data-animate id="team">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(99 102 241 / 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Founding Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The visionary partners behind this project
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Circular Image Container */}
                  <div className="relative w-48 h-48 mb-8 group">
                    <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-primary-500/20 dark:border-primary-400/20" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-lg text-primary-600 dark:text-primary-400 mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24" data-animate id="cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="relative bg-gradient-to-r from-primary-600 to-blue-600 p-12 md:p-16">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.07] to-transparent opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                  }}
                ></div>
              </div>

              {/* Content */}
              <div className="relative max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Content Creation?
                </h2>
                <p className="text-xl text-white/90 mb-12">
                  Join thousands of creators and professionals already using our AI platform. Start
                  creating amazing content today!
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-8 py-4 bg-white text-primary-600 hover:bg-gray-50 rounded-xl font-medium transition-colors flex items-center justify-center group"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-8 py-4 bg-primary-700/50 text-white hover:bg-primary-700/70 rounded-xl font-medium transition-colors flex items-center justify-center backdrop-blur-sm"
                  >
                    View Live Demo
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 pt-12 border-t border-white/20">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">100K+</div>
                      <div className="text-sm text-white/80 mt-1">Active Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">1M+</div>
                      <div className="text-sm text-white/80 mt-1">AI Generations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">99.9%</div>
                      <div className="text-sm text-white/80 mt-1">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">4.9/5</div>
                      <div className="text-sm text-white/80 mt-1">User Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800" data-animate id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer */}
          <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                  AI Platform
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Creating the future of content generation with artificial intelligence.
              </p>
              <div className="flex space-x-4">
                {/* Social Links */}
                <a
                  href="https://github.com/salmaneben/ai-chat-image-platformv1.git"
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Footer Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/features" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/documentation" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/support" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} AI Platform. All rights reserved.
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/terms" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Terms
                </Link>
                <Link to="/privacy" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Privacy
                </Link>
                <Link to="/cookies" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default Presentation;