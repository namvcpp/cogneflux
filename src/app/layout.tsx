import type { Metadata } from "next";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css'; // Re-add CSS import

export const metadata: Metadata = {
  title: 'Cogneflux - Dynamic Knowledge Learning',
  description: 'Connect concepts through interactive visualizations and personalized learning paths',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Add 'dark' class if implementing dark mode toggle
    <html lang="en" className="antialiased"> 
      <body className="bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          {/* Add padding and ensure main content grows */}
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
