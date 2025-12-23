import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const LoginView: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(email);
    }, 1000);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#05080f]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-[#101723]/60 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-[28px]">photo_library</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to access your shared memories</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Email</label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors material-symbols-outlined text-[20px]">mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0d121c] border border-slate-700 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-slate-600"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
               <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
               <a href="#" className="text-xs text-primary hover:text-blue-400 transition-colors font-medium">Forgot password?</a>
            </div>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors material-symbols-outlined text-[20px]">lock</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d121c] border border-slate-700 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-slate-600"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Sign In</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-x-0 h-px bg-white/10"></div>
            <span className="relative bg-[#151d2b] px-3 text-xs text-slate-500 font-medium">Or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-white text-sm font-medium transition-all">
                <img src="https://lh3.googleusercontent.com/COxitq8kCuOiWIyyeV83J7gt_5z2l175d9msY3kOrGw286bnvFSu_18naK3tFLj6ISRuFPcffi3ElVEXXk7s" className="w-5 h-5" alt="Google" />
                Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-white text-sm font-medium transition-all">
                <span className="material-symbols-outlined text-[22px]">apple</span>
                Apple
            </button>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
            Don't have an account? <a href="#" className="text-white hover:underline font-medium">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginView;