
import React, { useState } from 'react';

interface UrlInputProps {
  onDownload: (url: string) => void;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onDownload, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onDownload(url.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to paste:', err);
    }
  };

  const handleClear = () => {
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto">
      <div className="relative group">
        {/* Glowing background effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-[2rem] blur-xl opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
        
        <div className="relative flex flex-col md:flex-row items-stretch md:items-center glass-card rounded-[1.5rem] md:rounded-full p-2 gap-2 shadow-2xl">
          <div className="flex flex-1 items-center px-4">
            <div className="text-blue-400/50 mr-3">
              <i className="fas fa-link text-xl"></i>
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste link from TikTok, Instagram, YouTube..."
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 py-4 text-lg font-medium"
              required
              disabled={isLoading}
            />
            {url && !isLoading && (
              <button 
                type="button"
                onClick={handleClear}
                className="p-2 text-gray-500 hover:text-white transition-colors"
                title="Clear input"
              >
                <i className="fas fa-times-circle text-lg"></i>
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-1 px-2 md:px-0">
            <button 
              type="button"
              onClick={handlePaste}
              className="flex-1 md:flex-none p-3 px-5 rounded-xl md:rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center space-x-2"
              title="Paste from clipboard"
              disabled={isLoading}
            >
              <i className="far fa-paste text-lg"></i>
              <span className="md:hidden text-sm font-bold">Paste</span>
            </button>

            <button
              type="submit"
              disabled={isLoading || !url}
              className={`flex-1 md:flex-none flex items-center justify-center px-10 py-4 rounded-xl md:rounded-full font-black text-white transition-all shadow-xl tracking-wide uppercase text-sm ${
                isLoading 
                  ? 'bg-blue-800 opacity-50 cursor-not-allowed' 
                  : !url ? 'bg-gray-700 cursor-not-allowed opacity-30' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:scale-[1.03] active:scale-95 hover:shadow-blue-500/30'
              }`}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin mr-3"></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-arrow-right-long mr-3"></i>
                  Fetch Media
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center space-x-4 text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-widest">
        <span>No Login Required</span>
        <span className="w-1 h-1 rounded-full bg-gray-700"></span>
        <span>Secure HTTPS</span>
        <span className="w-1 h-1 rounded-full bg-gray-700"></span>
        <span>High Resolution</span>
      </div>
    </form>
  );
};

export default UrlInput;
