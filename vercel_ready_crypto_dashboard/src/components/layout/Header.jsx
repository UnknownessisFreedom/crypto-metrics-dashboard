import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              Crypto Metrics Dashboard
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/bitcoin" className="text-gray-300 hover:text-white transition-colors">
              Bitcoin
            </Link>
            <Link href="/ethereum" className="text-gray-300 hover:text-white transition-colors">
              Ethereum
            </Link>
            <Link href="/solana" className="text-gray-300 hover:text-white transition-colors">
              Solana
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 rounded-md px-3 py-1">
              <span className="text-green-400 text-sm">Live Data</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
