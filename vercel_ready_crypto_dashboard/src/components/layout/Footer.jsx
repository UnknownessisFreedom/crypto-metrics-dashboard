import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Crypto Metrics Dashboard. All data is simulated for demonstration purposes.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
              Dashboard
            </Link>
            <Link href="/bitcoin" className="text-gray-400 hover:text-white text-sm transition-colors">
              Bitcoin
            </Link>
            <Link href="/ethereum" className="text-gray-400 hover:text-white text-sm transition-colors">
              Ethereum
            </Link>
            <Link href="/solana" className="text-gray-400 hover:text-white text-sm transition-colors">
              Solana
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
