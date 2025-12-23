import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface RegisterProps {
  onNavigateToLogin: () => void;
  onRegisterSuccess: () => void;
}

const RegisterView: React.FC<RegisterProps> = ({ onNavigateToLogin, onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2AYn9gz_S9_In0dms7lYItxLwpHVQIGuE0uaQqD_Ku_5-hqZx5OsjVhOyK4hFrd2bnAdtS7Di-SlrF65naRPvo3Cr3cL6jydsZ-VbV4_mj74BkhtONY29JYpsb5OBYWpc8s3fsKzrYM8sKTTrk5mUHQlhqNzpdbqH2JmnnjdaGfWAM9wbMv9slyePwbjsTGVQo0_q6oumdqn_MdHb4IaIIn2hfwQWtipGnvnWSftfb47ohxx61-2BZ8ut00dxwZXvGFWXuKTfUl-K'
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create profile entry in 'users' table
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            { 
              id: authData.user.id,
              email: email,
              full_name: fullName,
              role: 'User', // Default role
              avatar_url: authData.user.user_metadata.avatar_url
            }
          ]);

        if (profileError) {
            console.error("Profile creation error:", profileError);
            // Optionally throw error, but auth was successful
        }
        
        onRegisterSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#05080f]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/20 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-[#101723]/60 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">Create Account</h1>
          <p className="text-slate-400 text-sm mt-1">Join Memoria to start sharing moments</p>
        </div>

        {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Full Name</label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors material-symbols-outlined text-[20px]">person</span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#0d121c] border border-slate-700 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-slate-600"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Email</label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors material-symbols-outlined text-[20px]">mail</span>
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
             <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Password</label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors material-symbols-outlined text-[20px]">lock</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d121c] border border-slate-700 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-slate-600"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-secondary to-pink-600 hover:from-secondary/90 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-secondary/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Sign Up</span>
                <span className="material-symbols-outlined text-[18px]">person_add</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-500">
            Already have an account? <button onClick={onNavigateToLogin} className="text-white hover:underline font-medium">Log In</button>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;