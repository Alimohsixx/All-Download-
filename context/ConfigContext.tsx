
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, PlatformConfig } from '../types';

const DEFAULT_CONFIG: SiteConfig = {
  siteName: 'Snap',
  siteNameAccent: 'Fetch',
  heroTitle: 'The Ultimate',
  heroAccent: 'Social',
  heroSubtitle: 'Download high-quality videos, high-res images, and audio tracks from across the web in a single click.',
  contactEmail: 'support@snapfetch.com',
  githubUrl: 'https://github.com',
  platforms: [
    { id: '1', name: 'Instagram', icon: 'fa-instagram', color: 'text-pink-500', url: 'https://instagram.com', enabled: true },
    { id: '2', name: 'TikTok', icon: 'fa-tiktok', color: 'text-white', url: 'https://tiktok.com', enabled: true },
    { id: '3', name: 'YouTube', icon: 'fa-youtube', color: 'text-red-500', url: 'https://youtube.com', enabled: true },
    { id: '4', name: 'Facebook', icon: 'fa-facebook', color: 'text-blue-600', url: 'https://facebook.com', enabled: true },
    { id: '5', name: 'Twitter', icon: 'fa-twitter', color: 'text-blue-400', url: 'https://twitter.com', enabled: true },
    { id: '6', name: 'Pinterest', icon: 'fa-pinterest', color: 'text-red-600', url: 'https://pinterest.com', enabled: true }
  ]
};

interface ConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: SiteConfig) => void;
  resetConfig: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('snapfetch_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('snapfetch_config', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: SiteConfig) => setConfig(newConfig);
  const resetConfig = () => setConfig(DEFAULT_CONFIG);

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig must be used within ConfigProvider');
  return context;
};
