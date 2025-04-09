
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  popular = false
}: { 
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}) => {
  return (
    <div className={`rounded-xl p-6 sm:p-8 shadow-soft border ${popular ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white'}`}>
      {popular && (
        <div className="mb-4">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-primary text-white">
            Popular Choice
          </span>
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-gray-500">/month</span>}
      </div>
      
      <p className="text-gray-600 mb-6">{description}</p>
      
      <Button 
        className={`w-full mb-8 ${popular ? '' : 'bg-gray-800 hover:bg-gray-700'}`}
        asChild
      >
        <Link to="/signup">{buttonText}</Link>
      </Button>
      
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
              <Check size={12} className="text-green-600" />
            </div>
            <span className="text-gray-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-blue-100 text-primary mb-4">
                Pricing
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Simple, transparent pricing</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the perfect plan for your lead management needs with no hidden fees.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <PricingTier 
                title="Starter"
                price="$49"
                description="Perfect for small businesses just getting started with lead management."
                buttonText="Get Started"
                features={[
                  "Up to 500 leads",
                  "Basic lead scoring",
                  "Email integration",
                  "WhatsApp integration",
                  "1 user account"
                ]}
              />
              
              <PricingTier 
                title="Professional"
                price="$99"
                description="Advanced features for growing businesses with more complex needs."
                buttonText="Get Started"
                popular={true}
                features={[
                  "Up to 2,500 leads",
                  "Advanced AI lead scoring",
                  "Email automation",
                  "WhatsApp integration",
                  "Team collaboration (5 users)",
                  "API access",
                  "Priority support"
                ]}
              />
              
              <PricingTier 
                title="Enterprise"
                price="Custom"
                description="Tailored solutions for large organizations with custom requirements."
                buttonText="Contact Sales"
                features={[
                  "Unlimited leads",
                  "Custom AI model training",
                  "Advanced analytics & reporting",
                  "Dedicated account manager",
                  "Unlimited users",
                  "Custom integrations",
                  "24/7 priority support",
                  "SLA guarantees"
                ]}
              />
            </div>
            
            <div className="mt-20 text-center">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto grid gap-6">
                <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-100">
                  <h3 className="font-semibold mb-2">Can I change plans later?</h3>
                  <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-100">
                  <h3 className="font-semibold mb-2">Do you offer a free trial?</h3>
                  <p className="text-gray-600">Yes, all plans come with a 14-day free trial, no credit card required.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-100">
                  <h3 className="font-semibold mb-2">How does the AI lead scoring work?</h3>
                  <p className="text-gray-600">Our AI analyzes user behavior, message content, and engagement metrics to assign a score from 1-100, helping you identify your most promising leads.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
