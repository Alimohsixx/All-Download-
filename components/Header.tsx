
import React from 'react';
import { useConfig } from '../context/ConfigContext';

interface HeaderProps {
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick }) => {
  const { config } = useConfig();

  return (
    <header className="sticky top-0 z-50 glass-card px-4 py-4 md:px-8 border-b border-white/5">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <i className="fas fa-bolt text-white text-xl"></i>
          </div>
          <span className="text-2xl font-bold tracking-tighter">
            {config.siteName}<span className="text-blue-400">{config.siteNameAccent}</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-blue-400 transition-colors font-medium">Home</a>
          <button onClick={onAdminClick} className="hover:text-blue-400 transition-colors font-medium">Admin Panel</button>
          <a href="#" className="hover:text-blue-400 transition-colors font-medium">FAQ</a>
        </nav>

        <div className="flex items-center space-x-3">
          <button 
            onClick={onAdminClick}
            className="md:hidden w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10"
          >
            <i className="fas fa-cog"></i>
          </button>
          <a 
            href={config.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 transition-all px-4 py-2 rounded-full text-sm font-semibold border border-white/10"
          >
            <i className="fab fa-github mr-2"></i>Star Us
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
