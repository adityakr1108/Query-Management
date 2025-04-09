
import { 
  LineChart, Brain, MailOpen, Users, 
  BarChart3, MessagesSquare, Zap, Shield 
} from 'lucide-react';

const features = [
  {
    title: 'Advanced Lead Tracking',
    description: 'Monitor user behavior across your website, tracking clicks, visits, and engagement time.',
    icon: <LineChart className="h-8 w-8 text-primary" />
  },
  {
    title: 'AI-Powered Scoring',
    description: 'Our DeepSeek-powered AI analyzes user interactions and assigns intelligent lead scores.',
    icon: <Brain className="h-8 w-8 text-primary" />
  },
  {
    title: 'Personalized Emails',
    description: 'Send targeted emails based on user interests and behavior with our intelligent system.',
    icon: <MailOpen className="h-8 w-8 text-primary" />
  },
  {
    title: 'User & Admin Dashboards',
    description: 'Intuitive interfaces for both customers and administrators with real-time data.',
    icon: <Users className="h-8 w-8 text-primary" />
  },
  {
    title: 'Comprehensive Analytics',
    description: 'Gain deep insights into lead performance and conversion with detailed reports.',
    icon: <BarChart3 className="h-8 w-8 text-primary" />
  },
  {
    title: 'WhatsApp Integration',
    description: 'Connect with leads through WhatsApp for immediate engagement and support.',
    icon: <MessagesSquare className="h-8 w-8 text-primary" />
  },
  {
    title: 'Automated Workflows',
    description: 'Create custom trigger-based workflows to nurture leads through the sales process.',
    icon: <Zap className="h-8 w-8 text-primary" />
  },
  {
    title: 'Secure Authentication',
    description: 'Role-based access control with JWT for secure user and admin authentication.',
    icon: <Shield className="h-8 w-8 text-primary" />
  }
];

const FeatureSection = () => {
  return (
    <div id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-blue-100 text-primary mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Everything you need to manage leads effectively</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform combines powerful lead management tools with cutting-edge AI technology to help you convert more prospects into customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl bg-white border border-gray-100 shadow-soft hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-4 rounded-xl bg-blue-50 inline-flex mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
