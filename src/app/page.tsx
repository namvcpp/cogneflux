import Link from 'next/link';
import Hero from '@/components/home/Hero';
import FeatureGrid from '@/components/home/FeatureGrid';

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section - Already styled */}
      <Hero />

      {/* Features Section */}
      <section className="bg-subtle rounded-xl shadow-md section-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="section-title mb-4">
              Reimagine How You Learn
            </h2>
            <p className="text-lg text-muted">
              Our innovative approach connects concepts in ways traditional learning can't.
            </p>
          </div>
        </div>

        {/* Feature Grid Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureGrid />
        </div>
      </section>
    </div>
  );
}
