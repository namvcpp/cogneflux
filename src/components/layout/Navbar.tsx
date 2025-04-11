'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiUser, FiSearch, FiSun, FiMoon } from 'react-icons/fi';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Mock authentication status (replace with real auth later)
  const isAuthenticated = true;
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard', auth: true },
    { name: 'Lessons', path: '/lessons' },
    { name: 'Node Editor', path: '/editor', auth: true },
  ];
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="balanced-container">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group pl-1">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                Cogneflux
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => {
              if (link.auth && !isAuthenticated) return null;
              
              return (
                <Link 
                  key={link.path}
                  href={link.path}
                  className={`mx-2.5 px-3.5 py-2 rounded-md text-sm font-medium transition-colors
                    ${pathname === link.path 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          
          <div className="flex items-center space-x-3 pr-1">
            <button 
              className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            
            {isAuthenticated ? (
              <Link 
                href="/profile" 
                className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Profile"
              >
                <FiUser size={18} />
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-full text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-100 dark:border-gray-700 animate-fadeIn px-2">
            {navLinks.map(link => {
              if (link.auth && !isAuthenticated) return null;
              
              return (
                <Link 
                  key={link.path}
                  href={link.path}
                  className={`block px-5 py-2.5 rounded-md text-sm font-medium transition-colors
                    ${pathname === link.path 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
