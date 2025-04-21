import Link from 'next/link';
import Hero from '@/components/home/Hero';
import FeatureGrid from '@/components/home/FeatureGrid';

export default function Home() {
  return (
    <div className="space-y-20 md:space-y-32">
      {/* Hero Section - Already styled */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="section-title mb-6 font-extrabold text-4xl">
              Reimagine How You Learn
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-muted leading-relaxed">
              Our innovative approach connects concepts in ways traditional learning can't.
            </p>
          </div>
        </div>

        {/* Feature Grid Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <FeatureGrid />
        </div>
      </section>
      
      {/* Call to Action Section - Inspired by honghong.me */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Learning Experience?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
              Join thousands of learners who are already experiencing knowledge in a whole new way.
            </p>
            <Link href="/chat" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-xl px-8 py-4 inline-block transition-all duration-200">
              Try AI Chat Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
