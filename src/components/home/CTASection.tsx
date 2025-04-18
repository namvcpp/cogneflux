import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <h2 className="section-title text-white mb-6 text-balance">
          Ready to Transform Your Learning Experience?
        </h2>
        <p className="text-lg leading-8 text-blue-100 dark:text-blue-200 mb-12 max-w-2xl mx-auto text-balance">
          Join thousands of learners who have accelerated their understanding with Cogneflux's powerful visualization tools.
        </p>
        <div className="button-group justify-center">
          <Link
            href="/signup"
            className="btn btn-primary w-full sm:w-auto"
          >
            Get Started For Free
            <FiArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
          <Link
            href="/demo"
            className="btn btn-outline border-white/80 text-white hover:bg-white/10 w-full sm:w-auto"
          >
            Watch Demo
          </Link>
        </div>
      </div>
    </section>
  );
}