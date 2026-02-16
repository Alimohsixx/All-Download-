
import React, { useState, useCallback } from 'react';
import { fetchMediaData } from './services/apiService';
import { ApiResponse } from './types';
import Header from './components/Header';
import UrlInput from './components/UrlInput';
import ResultDisplay from './components/ResultDisplay';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import { ConfigProvider, useConfig } from './context/ConfigContext';

const MainAppContent: React.FC = () => {
  const { config } = useConfig();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleDownload = useCallback(async (url: string) => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchMediaData(url);
      if (data && data.medias && data.medias.length > 0) {
        setResult(data);
      } else {
        setError("No media found at this URL. Please check the link and try again.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong while fetching the media.");
    } finally {
      setLoading(false);
    }
  }, []);

  const openAdmin = () => {
    if (isLoggedIn) setIsAdminOpen(true);
    else setIsLoginOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
    setIsAdminOpen(true);
  };

  const enabledPlatforms = config.platforms.filter(p => p.enabled);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onAdminClick={openAdmin} />
      
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
      {isLoginOpen && <Login onCancel={() => setIsLoginOpen(false)} onSuccess={handleLoginSuccess} />}

      <main className="flex-grow container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
            Fastest Downloader v2.1
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            {config.heroTitle} <span className="gradient-text">{config.heroAccent}</span> <br className="hidden md:block"/> Downloader
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            {config.heroSubtitle}
          </p>
        </div>

        <UrlInput onDownload={handleDownload} isLoading={loading} />

        {/* Supported Platforms Section (Managed from Admin) */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
          {enabledPlatforms.map((p, idx) => (
            <a key={idx} href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm font-medium hover:scale-105 transition-transform">
              <i className={`fab ${p.icon} ${p.color} text-lg`}></i>
              <span className="text-gray-400">{p.name}</span>
            </a>
          ))}
        </div>

        {error && (
          <div className="mt-12 p-5 bg-red-900/20 border border-red-500/30 rounded-2xl text-red-200 flex items-start animate-in fade-in zoom-in duration-300">
            <i className="fas fa-circle-exclamation mt-1 mr-4 text-xl text-red-500"></i>
            <div>
              <p className="font-bold text-red-400">Fetch Failed</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        )}

        {loading && !result && (
          <div className="mt-12 space-y-4 animate-pulse">
            <div className="h-64 glass-card rounded-3xl w-full"></div>
          </div>
        )}

        {result && <ResultDisplay result={result} />}

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'fa-bolt-lightning', title: 'Instant Processing', desc: 'Our servers process links in real-time, delivering downloads faster than ever.' },
            { icon: 'fa-shield-halved', title: 'Safe & Anonymous', desc: 'We never store your personal data. Your privacy is our priority.' },
            { icon: 'fa-gem', title: 'Highest Quality', desc: 'Get access to 4K, 1080p, and HD formats directly from the original source.' }
          ].map((feature, idx) => (
            <div key={idx} className="glass-card p-8 rounded-3xl border border-white/5 hover:bg-white/[0.07] transition-all">
              <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-6">
                <i className={`fas ${feature.icon} text-blue-400 text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <MainAppContent />
    </ConfigProvider>
  );
};

export default App;
