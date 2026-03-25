
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Fashion" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
          <span className="uppercase tracking-[0.5em] text-xs mb-4 animate-fade-in">New Season 2024</span>
          <h1 className="text-6xl md:text-8xl font-serif tracking-tight mb-8">The Minimalist <br/> Collection</h1>
          <div className="flex space-x-8 uppercase tracking-[0.2em] text-[11px]">
            <Link to="/catalog?category=Women" className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-all">Women</Link>
            <Link to="/catalog?category=Men" className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-all">Men</Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-[1920px] mx-auto px-6 lg:px-12 py-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        <Link to="/catalog?category=Women" className="group relative aspect-[3/4] overflow-hidden bg-gray-50">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop" 
            alt="Women's Collection" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end p-12 bg-gradient-to-t from-black/40 to-transparent">
            <div>
              <h2 className="text-white text-3xl font-serif mb-2">The Modern Woman</h2>
              <span className="text-white uppercase tracking-widest text-[10px] border-b border-white pb-1">Explore Collection</span>
            </div>
          </div>
        </Link>
        <Link to="/catalog?category=Men" className="group relative aspect-[3/4] overflow-hidden bg-gray-50">
          <img 
            src="https://images.unsplash.com/photo-1516257984877-a03a8047037a?q=80&w=2000&auto=format&fit=crop" 
            alt="Men's Collection" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end p-12 bg-gradient-to-t from-black/40 to-transparent">
            <div>
              <h2 className="text-white text-3xl font-serif mb-2">Essential Men</h2>
              <span className="text-white uppercase tracking-widest text-[10px] border-b border-white pb-1">Explore Collection</span>
            </div>
          </div>
        </Link>
      </section>

      {/* Editorial Quote */}
      <section className="py-32 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="uppercase tracking-[0.4em] text-[10px] text-gray-400 block mb-8">Craftsmanship</span>
          <p className="text-3xl md:text-5xl font-serif italic leading-relaxed">
            "Simplicity is the ultimate sophistication. We believe in high-quality materials, ethical production, and timeless silhouettes that define the modern wardrobe."
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
