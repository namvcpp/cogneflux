'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = true; // Mock

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard', auth: true },
    { name: 'Lessons', path: '/lessons' },
    { name: 'Node Editor', path: '/editor', auth: true },
  ];

  return (
    // Add background, padding, shadow, sticky positioning
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      {/* Use a container for max-width and centering */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for logo, links, and actions */}
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2 md:text-2xl font-bold text-primary">
              Cogneflux
            </Link>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => {
              if (link.auth && !isAuthenticated) return null;
              const isActive = pathname === link.path;
              return (
          <Link
            key={link.path}
            href={link.path}
            className={`text-sm font-medium transition-colors duration-150 ${
              isActive 
                ? 'text-primary' 
                : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
          >
            {link.name}
          </Link>
              );
            })}
          </div>

          {/* Action buttons (Profile/Login) & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link
                href="/profile"
                aria-label="Profile"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
              >
                <FiUser size={20} />
              </Link>
            ) : (
              <Link
                href="/login"
                className="btn btn-secondary text-sm" // Use button styles
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => {
              if (link.auth && !isAuthenticated) return null;
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ${
                    isActive 
                      ? 'bg-blue-50 text-primary dark:bg-gray-800 dark:text-primary' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
