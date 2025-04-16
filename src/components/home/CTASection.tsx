import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6 text-balance">
          Ready to Transform Your Learning Experience?
        </h2>
        <p className="text-lg leading-8 text-blue-100 dark:text-blue-200 mb-12 max-w-2xl mx-auto text-balance">
          Join thousands of learners who have accelerated their understanding with Cogneflux's powerful visualization tools.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/signup" 
            className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200 w-full sm:w-auto"
          >
            Get Started For Free
            <FiArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
          
          <Link 
            href="/demo" 
            className="inline-flex items-center justify-center rounded-md border border-white/80 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white transition-colors duration-200 w-full sm:w-auto"
          >
            Watch Demo
          </Link>
        </div>
      </div>
    </section>
  );
}