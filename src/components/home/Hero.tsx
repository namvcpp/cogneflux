import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="hero-banner w-full bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="adaptive-container-wide">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl mx-auto text-balance">
            Reimagine Learning Through <span className="text-blue-600 dark:text-blue-400">Connection</span>
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-balance">
            Transform your understanding with interactive visualizations that connect concepts and enhance retention.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link 
              href="/signup" 
              className="btn-primary text-lg py-3 px-8"
            >
              Get Started <FiArrowRight className="ml-1" />
            </Link>
            
            <Link 
              href="/lessons" 
              className="btn-secondary text-lg py-3 px-8"
            >
              Explore Lessons
            </Link>
          </div>
          
          <div className="relative w-full max-w-5xl h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-xl">
            <Image 
              src="/images/dashboard-preview.jpg" 
              alt="Cogneflux Dashboard Preview" 
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
