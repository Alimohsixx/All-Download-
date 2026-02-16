
import React from 'react';
import { useConfig } from '../context/ConfigContext';

const Footer: React.FC = () => {
  const { config } = useConfig();
  const enabledPlatforms = config.platforms.filter(p => p.enabled);

  return (
    <footer className="mt-auto py-12 border-t border-white/5 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-bolt text-white"></i>
              </div>
              <span className="text-xl font-bold tracking-tighter">
                {config.siteName}<span className="text-blue-400">{config.siteNameAccent}</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {config.heroSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Product</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-blue-400">Features</a></li>
                <li><a href="#" className="hover:text-blue-400">Platforms</a></li>
                <li><a href="#" className="hover:text-blue-400">API Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Support</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href={`mailto:${config.contactEmail}`} className="hover:text-blue-400">Contact Support</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Social Media</h4>
            <div className="flex flex-wrap gap-3">
              {enabledPlatforms.map((p) => (
                <a 
                  key={p.id} 
                  href={p.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-gray-400"
                  title={p.name}
                >
                  <i className={`fab ${p.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs text-center md:text-left space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} {config.siteName}{config.siteNameAccent} All-in-One Downloader. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span>Powered by All-in-One Elite API</span>
            <span className="w-1 h-1 rounded-full bg-gray-700"></span>
            <span>Version 2.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
