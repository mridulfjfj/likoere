
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!product) {
    return <div className="pt-32 px-12 uppercase tracking-widest text-sm text-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    setError('');
    addToCart(product, selectedSize);
    onOpenCart();
  };

  return (
    <div className="pt-20 lg:h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Product Image Gallery */}
      <div className="lg:flex-1 h-full bg-gray-50 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          {product.images.map((img, idx) => (
            <img 
              key={idx} 
              src={img} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          ))}
          {/* Mock extra images for scroll depth */}
          <img src={product.images[0]} alt="alternate view" className="w-full h-auto object-cover opacity-80" />
        </div>
      </div>

      {/* Product Info Section */}
      <div className="lg:w-[450px] h-full bg-white p-8 lg:p-16 flex flex-col justify-center overflow-y-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl uppercase tracking-[0.2em] font-medium leading-tight">{product.name}</h1>
            <p className="text-lg mt-4 font-serif italic">${product.price.toFixed(2)}</p>
          </div>

          <div className="text-[12px] leading-relaxed text-gray-600 uppercase tracking-widest space-y-4">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-black/10 pb-2">
              <span className="uppercase tracking-widest text-[10px] font-bold">Select Size</span>
              <button className="text-[9px] uppercase tracking-widest underline opacity-40">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => { setSelectedSize(size); setError(''); }}
                  className={`h-10 text-[11px] uppercase tracking-widest transition-all ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-50 text-black hover:bg-gray-200'}`}
                >
                  {size}
                </button>
              ))}
            </div>
            {error && <p className="text-red-500 text-[10px] uppercase tracking-widest">{error}</p>}
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white uppercase tracking-[0.3em] text-[11px] py-5 hover:bg-black/90 transition-colors"
          >
            Add to Basket
          </button>

          <div className="pt-12 space-y-4">
            <details className="border-t border-black/5 group">
              <summary className="py-4 uppercase tracking-[0.2em] text-[10px] font-bold cursor-pointer list-none flex justify-between items-center">
                Composition & Care
                <span className="group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <div className="pb-4 text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                Outer shell: 100% Cotton. Do not bleach. Dry clean only.
              </div>
            </details>
            <details className="border-t border-black/5 group">
              <summary className="py-4 uppercase tracking-[0.2em] text-[10px] font-bold cursor-pointer list-none flex justify-between items-center">
                Shipping & Returns
                <span className="group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <div className="pb-4 text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                Free shipping on orders over $150. Returns accepted within 30 days.
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
