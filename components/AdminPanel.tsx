
import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { SiteConfig, PlatformConfig } from '../types';

const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { config, updateConfig, resetConfig } = useConfig();
  const [localConfig, setLocalConfig] = useState<SiteConfig>(config);
  const [activeTab, setActiveTab] = useState<'general' | 'platforms' | 'contact'>('general');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateConfig(localConfig);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const updatePlatform = (id: string, updates: Partial<PlatformConfig>) => {
    const newPlatforms = localConfig.platforms.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    setLocalConfig({ ...localConfig, platforms: newPlatforms });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center p-4 md:p-8 overflow-hidden">
      <div className="w-full max-w-5xl h-full max-h-[90vh] glass-card rounded-[2rem] flex flex-col md:flex-row overflow-hidden border border-white/10 shadow-2xl">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-black/40 border-r border-white/5 p-6 flex flex-col">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-user-shield text-white text-sm"></i>
            </div>
            <span className="font-black tracking-tighter text-xl">Admin Panel</span>
          </div>

          <nav className="flex-grow space-y-2">
            {[
              { id: 'general', icon: 'fa-cog', label: 'General' },
              { id: 'platforms', icon: 'fa-share-nodes', label: 'Platforms' },
              { id: 'contact', icon: 'fa-address-book', label: 'Contact' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5'}`}
              >
                <i className={`fas ${tab.icon}`}></i>
                <span className="font-bold text-sm">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-2">
            <button onClick={resetConfig} className="w-full py-2 text-xs text-red-400 hover:text-red-300 transition-colors">Reset to Default</button>
            <button onClick={onClose} className="w-full bg-white/5 hover:bg-white/10 py-3 rounded-xl font-bold text-sm transition-all border border-white/5">Exit Dashboard</button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow p-6 md:p-10 overflow-y-auto custom-scrollbar bg-black/20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black capitalize">{activeTab} Settings</h2>
            <button 
              onClick={handleSave}
              className={`px-8 py-3 rounded-xl font-black text-sm transition-all shadow-xl ${isSaved ? 'bg-green-600' : 'bg-blue-600 hover:scale-105 active:scale-95'}`}
            >
              {isSaved ? <><i className="fas fa-check mr-2"></i> Saved</> : 'Save Changes'}
            </button>
          </div>

          <div className="space-y-8">
            {activeTab === 'general' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Site Name</label>
                  <input type="text" value={localConfig.siteName} onChange={e => setLocalConfig({...localConfig, siteName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none"/>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Name Accent</label>
                  <input type="text" value={localConfig.siteNameAccent} onChange={e => setLocalConfig({...localConfig, siteNameAccent: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none text-blue-400"/>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Hero Title</label>
                  <input type="text" value={localConfig.heroTitle} onChange={e => setLocalConfig({...localConfig, heroTitle: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none"/>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Hero Accent Text</label>
                  <input type="text" value={localConfig.heroAccent} onChange={e => setLocalConfig({...localConfig, heroAccent: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none text-blue-400"/>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Hero Subtitle</label>
                  <textarea rows={3} value={localConfig.heroSubtitle} onChange={e => setLocalConfig({...localConfig, heroSubtitle: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none resize-none"/>
                </div>
              </div>
            )}

            {activeTab === 'platforms' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                {localConfig.platforms.map(p => (
                  <div key={p.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col md:flex-row items-center gap-4">
                    <div className="flex items-center space-x-4 flex-1">
                       <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${p.color}`}>
                        <i className={`fab ${p.icon} text-xl`}></i>
                      </div>
                      <div className="flex-grow">
                        <input type="text" value={p.name} onChange={e => updatePlatform(p.id, {name: e.target.value})} className="bg-transparent border-none focus:ring-0 font-bold p-0 w-full"/>
                        <input type="text" value={p.url} onChange={e => updatePlatform(p.id, {url: e.target.value})} className="bg-transparent border-none focus:ring-0 text-xs text-gray-500 p-0 w-full" placeholder="Social link URL"/>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <span className="text-xs mr-2 text-gray-500 uppercase font-bold">{p.enabled ? 'Enabled' : 'Disabled'}</span>
                        <button 
                          onClick={() => updatePlatform(p.id, {enabled: !p.enabled})}
                          className={`w-12 h-6 rounded-full transition-all relative ${p.enabled ? 'bg-blue-600' : 'bg-gray-700'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${p.enabled ? 'left-7' : 'left-1'}`}></div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Support Email</label>
                  <input type="email" value={localConfig.contactEmail} onChange={e => setLocalConfig({...localConfig, contactEmail: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none"/>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Github Project URL</label>
                  <input type="text" value={localConfig.githubUrl} onChange={e => setLocalConfig({...localConfig, githubUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 ring-blue-500 outline-none"/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
