import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function CTASection() {
  return (
    <section className="full-bleed bg-blue-600 dark:bg-blue-700 text-white py-20 md:py-24">
      <div className="banner-content">
        <h2 className="banner-title">
          Ready to Transform Your Learning Experience?
        </h2>
        
        <p className="text-lg md:text-xl mb-10 text-blue-100 mx-auto max-w-2xl text-balance">
          Join thousands of learners who have accelerated their understanding with Cogneflux's powerful visualization tools.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            href="/signup" 
            className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get Started For Free
            <FiArrowRight className="ml-2" />
          </Link>
          
          <Link 
            href="/demo" 
            className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors"
          >
            Watch Demo
          </Link>
        </div>
      </div>
    </section>
  );
}