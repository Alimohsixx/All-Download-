
import React, { useState } from 'react';

interface LoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple password for demo
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-8 rounded-[2.5rem] border border-white/10 shadow-3xl animate-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-600/20">
            <i className="fas fa-lock text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-black">Admin Access</h2>
          <p className="text-gray-400 text-sm mt-2">Enter your password to manage SnapFetch</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin Password"
              className={`w-full bg-white/5 border ${error ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/10 focus:ring-2 ring-blue-500'} rounded-2xl px-6 py-4 outline-none transition-all text-center font-bold tracking-widest`}
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            Access Dashboard
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="w-full text-gray-500 hover:text-white transition-colors text-sm font-bold py-2"
          >
            Cancel
          </button>
        </form>
        
        <p className="text-[10px] text-center text-gray-600 mt-6 uppercase tracking-widest font-black">
          Default Password: admin123
        </p>
      </div>
    </div>
  );
};

export default Login;
