import Link from 'next/link';
import { FiTwitter, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-14 w-full">
      <div className="balanced-container">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 sm:col-span-1 px-1">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Cogneflux</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm leading-relaxed max-w-xs">
              Reimagine learning through interactive knowledge visualization.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <FiTwitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <FiFacebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <FiInstagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <FiYoutube size={18} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div className="px-1 md:pl-4">
            <h4 className="text-base font-bold text-gray-800 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link href="/lessons" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Lessons</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link href="/tutorials" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tutorials</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="px-1 md:pl-4">
            <h4 className="text-base font-bold text-gray-800 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link href="/partners" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Partners</Link></li>
            </ul>
          </div>
          
          <div className="px-1 md:pl-4">
            <h4 className="text-base font-bold text-gray-800 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><Link href="/terms" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; {currentYear} Cogneflux. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
