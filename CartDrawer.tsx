
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-black p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Categories (Desktop) */}
        <div className="hidden lg:flex items-center space-x-8 uppercase tracking-widest text-[11px] font-medium">
          <Link to="/catalog?category=Women" className="hover:opacity-50 transition-opacity">Women</Link>
          <Link to="/catalog?category=Men" className="hover:opacity-50 transition-opacity">Men</Link>
          <Link to="/catalog?category=Kids" className="hover:opacity-50 transition-opacity">Kids</Link>
          <Link to="/catalog" className="hover:opacity-50 transition-opacity">Collections</Link>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-3xl font-serif tracking-[0.2em]">MODA</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6 uppercase tracking-widest text-[11px] font-medium">
          <div className="hidden md:block">
            {user ? (
              <button onClick={logout} className="hover:opacity-50 transition-opacity">Logout</button>
            ) : (
              <Link to="/auth" className="hover:opacity-50 transition-opacity">Login</Link>
            )}
          </div>
          <button 
            onClick={onOpenCart}
            className="flex items-center space-x-1 hover:opacity-50 transition-opacity"
          >
            <span>Cart</span>
            <span>({totalItems})</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full h-screen bg-white z-40 p-8 space-y-6 flex flex-col uppercase tracking-widest text-sm">
          <Link to="/catalog?category=Women" onClick={() => setIsMenuOpen(false)}>Women</Link>
          <Link to="/catalog?category=Men" onClick={() => setIsMenuOpen(false)}>Men</Link>
          <Link to="/catalog?category=Kids" onClick={() => setIsMenuOpen(false)}>Kids</Link>
          <Link to="/catalog" onClick={() => setIsMenuOpen(false)}>Collections</Link>
          <hr className="border-gray-100" />
          {user ? (
            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-left">Logout</button>
          ) : (
            <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
