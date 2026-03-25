
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-12 shadow-sm">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-serif tracking-[0.2em] uppercase">{isLogin ? 'Log In' : 'Register'}</h1>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-4">Welcome to MODA Official Store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="uppercase tracking-widest text-[10px] font-bold text-gray-400">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-200 py-3 text-[12px] uppercase tracking-widest focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="uppercase tracking-widest text-[10px] font-bold text-gray-400">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-200 py-3 text-[12px] focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white uppercase tracking-[0.2em] text-[11px] py-4 mt-8 hover:bg-black/90 transition-all"
          >
            {isLogin ? 'Enter' : 'Create Account'}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center space-y-4">
          <p className="uppercase tracking-widest text-[10px] text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="uppercase tracking-[0.2em] text-[10px] font-bold border-b border-black pb-1"
          >
            {isLogin ? 'Register Now' : 'Log In Instead'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
