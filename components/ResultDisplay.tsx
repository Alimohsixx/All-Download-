
import React from 'react';
import { ApiResponse } from '../types';

interface ResultDisplayProps {
  result: ApiResponse;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return 'fa-video';
      case 'image': return 'fa-image';
      case 'audio': return 'fa-music';
      default: return 'fa-file';
    }
  };

  const getSourceIcon = (source: string) => {
    const s = source?.toLowerCase() || '';
    if (s.includes('youtube')) return 'fab fa-youtube text-red-500';
    if (s.includes('tiktok')) return 'fab fa-tiktok text-white';
    if (s.includes('instagram')) return 'fab fa-instagram text-pink-500';
    if (s.includes('facebook')) return 'fab fa-facebook text-blue-500';
    if (s.includes('twitter') || s.includes('x.com')) return 'fab fa-twitter text-blue-400';
    return 'fas fa-globe text-gray-400';
  };

  return (
    <div className="mt-16 glass-card rounded-[2.5rem] overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 shadow-3xl border border-white/10">
      <div className="md:flex">
        {/* Preview Section */}
        <div className="md:w-2/5 bg-black/60 flex items-center justify-center p-6 relative group border-r border-white/5">
          <div className="relative w-full aspect-square md:aspect-auto overflow-hidden rounded-2xl shadow-inner">
             <img 
              src={result.thumbnail || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1074&auto=format&fit=crop'} 
              alt={result.title} 
              className="w-full h-full rounded-2xl shadow-2xl transition-transform group-hover:scale-110 duration-1000 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          </div>
          {result.duration && (
            <span className="absolute bottom-10 right-10 bg-black/80 px-3 py-1.5 rounded-lg text-xs font-black text-white backdrop-blur-md border border-white/10">
              {result.duration}
            </span>
          )}
        </div>

        {/* Info & Downloads Section */}
        <div className="md:w-3/5 p-8 md:p-12 flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="flex items-center text-xs font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
              <i className={`${getSourceIcon(result.source)} mr-2 text-sm`}></i>
              {result.source || 'Social Content'}
            </span>
            {result.author && (
              <span className="text-gray-400 text-sm font-medium">
                by <span className="text-white bg-white/5 px-2 py-1 rounded">@{result.author}</span>
              </span>
            )}
          </div>

          <h3 className="text-2xl md:text-3xl font-black mb-8 leading-tight tracking-tight text-white/95">
            {result.title || 'Ready to Download'}
          </h3>

          <div className="space-y-4 flex-grow max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Available Formats</p>
              <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded uppercase">{result.medias.length} Options</span>
            </div>
            
            {result.medias.map((media, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all group hover:translate-x-1 duration-300">
                <div className="flex items-center min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mr-5 group-hover:bg-blue-500/20 transition-colors flex-shrink-0">
                    <i className={`fas ${getIcon(media.type)} text-blue-400 text-lg`}></i>
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors truncate capitalize">
                      {media.quality || 'Download Link'}
                    </p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5 tracking-tighter">
                      {media.extension} • {media.type}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button 
                    onClick={() => navigator.clipboard.writeText(media.url)}
                    className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    title="Copy direct link"
                  >
                    <i className="far fa-copy"></i>
                  </button>
                  <a 
                    href={media.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-black hover:bg-blue-400 hover:text-white px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center shadow-lg active:scale-95"
                  >
                    <i className="fas fa-download mr-2"></i>
                    GET
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
