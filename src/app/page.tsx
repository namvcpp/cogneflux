import Link from 'next/link';
import Hero from '@/components/home/Hero';
import FeatureGrid from '@/components/home/FeatureGrid';
import DemoVisualization from '@/components/home/DemoVisualization';
import TestimonialSlider from '@/components/home/TestimonialSlider';
import CTASection from '@/components/home/CTASection';
import { FiArrowRight } from 'react-icons/fi'; // Re-add needed icon

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-24"> {/* Add vertical spacing between sections */}
      {/* Hero Section - Already styled */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="mb-4"> {/* Use h2 style from globals.css */}
              Reimagine How You Learn
            </h2>
            <p> {/* Use p style from globals.css */}
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
