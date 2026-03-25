
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-[60] backdrop-blur-[2px]"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col">
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="uppercase tracking-[0.2em] font-medium text-sm">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 hover:opacity-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <p className="uppercase tracking-widest text-[11px] text-gray-400">Your cart is empty</p>
              <button 
                onClick={() => { onClose(); navigate('/catalog'); }}
                className="text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-50"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex space-x-4">
                <div className="w-24 h-32 bg-gray-50 overflow-hidden">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="uppercase tracking-widest text-[11px] font-medium leading-tight">{item.name}</h3>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Size: {item.selectedSize}</p>
                    <p className="text-[11px] mt-2">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-100 px-2 space-x-3 h-8">
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, -1)} className="text-xs">-</button>
                      <span className="text-[11px]">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, 1)} className="text-xs">+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-100 space-y-4">
            <div className="flex items-center justify-between uppercase tracking-widest text-[11px] font-semibold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => { onClose(); navigate('/checkout'); }}
              className="w-full bg-black text-white uppercase tracking-[0.2em] text-[11px] py-4 hover:bg-black/90 transition-colors"
            >
              Process Order
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
