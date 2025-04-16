import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (
    // Add padding, text alignment
    <section className="py-20 md:py-28 text-center">
      {/* Use a container to constrain width */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* Vertical spacing for elements */}
        <div className="space-y-6">
          {/* Large heading with gradient text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Reimagine Learning Through <span className="whitespace-nowrap">Connection</span>
          </h1>
          
          {/* Subheading/Paragraph */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your understanding with interactive visualizations that connect concepts and enhance retention.
          </p>
          
          {/* Action Buttons - Single primary CTA */}
          <div className="button-group justify-center pt-4">
            <Link 
              href="/signup"
              className="btn btn-primary px-8 py-3 text-lg" // Slightly larger button for emphasis
            >
              Get Started <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
            {/* Removed the Explore Lessons button */}
          </div>
        </div>
      </div>
    </section>
  );
}
