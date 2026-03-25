
import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

const Catalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || 'All');
  const [sortOrder, setSortOrder] = useState<'default' | 'priceLow' | 'priceHigh'>('default');

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (sortOrder === 'priceLow') result.sort((a, b) => a.price - b.price);
    if (sortOrder === 'priceHigh') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [activeCategory, sortOrder]);

  return (
    <div className="pt-32 pb-24 px-6 lg:px-12">
      {/* Filters Header */}
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-gray-100 pb-8">
        <div className="flex items-center space-x-8 uppercase tracking-widest text-[11px] font-medium overflow-x-auto whitespace-nowrap pb-4 md:pb-0">
          {['All', 'Women', 'Men', 'Accessories'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`transition-all ${activeCategory === cat ? 'opacity-100 border-b border-black pb-1' : 'opacity-40 hover:opacity-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-6">
          <select 
            className="uppercase tracking-widest text-[11px] font-medium bg-transparent border-none focus:ring-0 cursor-pointer"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
          >
            <option value="default">Sort By: Featured</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
          <span className="uppercase tracking-widest text-[11px] font-medium opacity-40">
            {filteredProducts.length} Items
          </span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1920px] mx-auto masonry-grid">
        {filteredProducts.map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`}
            className="group block"
          >
            <div className="aspect-[3/4] overflow-hidden bg-gray-50 relative">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-white text-black text-[9px] uppercase tracking-[0.2em] px-2 py-1 font-semibold">New</span>
              )}
            </div>
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="uppercase tracking-widest text-[11px] font-medium leading-tight group-hover:opacity-60 transition-opacity">
                  {product.name}
                </h3>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{product.category}</p>
              </div>
              <span className="text-[11px] font-medium">${product.price.toFixed(2)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
