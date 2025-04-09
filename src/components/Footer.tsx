
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-xl font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">LeadFlow</span>
            <p className="text-sm text-gray-500">
              AI-powered lead management system for modern businesses.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#features" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#about" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} LeadFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
