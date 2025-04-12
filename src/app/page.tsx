import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/home/Hero';
import FeatureGrid from '@/components/home/FeatureGrid';
import DemoVisualization from '@/components/home/DemoVisualization';
import TestimonialSlider from '@/components/home/TestimonialSlider';
import CTASection from '@/components/home/CTASection';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <Hero />
      
      {/* Arrow Indicator */}
      <div className="balanced-container text-center my-8">
        <div className="animate-bounce inline-block bg-blue-50 dark:bg-gray-800 p-2.5 rounded-full">
          <FiArrowDown className="text-blue-600 dark:text-blue-400 h-5 w-5" />
        </div>
      </div>
      
      {/* Features Section */}
      <section className="section w-full">
        <div className="adaptive-container">
          <div className="title-section">
            <h2 className="banner-title bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              Reimagine How You Learn
            </h2>
            <p className="banner-description">
              Our innovative approach connects concepts in ways traditional learning can't.
            </p>
          </div>
        </div>
        
        <div className="balanced-container px-4 sm:px-6 md:px-8 lg:px-10">
          <FeatureGrid />
        </div>
      </section>
      
      {/* Divider */}
      <div className="w-full max-w-3xl mx-auto px-6 my-16">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
      </div>
      
      {/* Demo Visualization Section */}
      <section className="banner-section bg-gradient-soft py-20 md:py-28">
        <div className="banner-content">
          <h2 className="banner-title">See Knowledge in a New Way</h2>
          <p className="banner-description">
            Interactive visualizations that make complex concepts clear and memorable.
          </p>
        </div>
        
        <div className="w-full max-w-5xl mx-auto px-6 md:px-8">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <DemoVisualization />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section w-full">
        <div className="adaptive-container-wide">
          <div className="title-section">
            <h2 className="banner-title">What Learners Say</h2>
            <p className="banner-description">
              Join thousands of satisfied users who have transformed their learning experience.
            </p>
          </div>
          
          <div className="w-full">
            <TestimonialSlider />
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/testimonials" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline gap-1.5 group">
              See all testimonials 
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Secondary CTA Section */}
      <section className="section-sm w-full">
        <div className="adaptive-container">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-10 shadow-md border border-gray-100 dark:border-gray-700 w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
              <div className="w-full md:w-2/3 md:pr-6">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-balance">Ready to Begin?</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-xl text-balance">
                  Start your journey with Cogneflux today and transform how you learn forever.
                </p>
              </div>
              <div className="w-full md:w-auto flex justify-center md:justify-end">
                <Link 
                  href="/signup" 
                  className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-medium transition-all flex items-center gap-2 hover:translate-y-[-1px] w-full md:w-auto justify-center"
                >
                  Get Started <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
