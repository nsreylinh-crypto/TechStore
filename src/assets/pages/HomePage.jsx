import React, { useState } from 'react';
import { ShoppingCart, Check, Search } from 'lucide-react';

export default function HomePage({ products, addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedFeedback, setAddedFeedback] = useState(null);

  const categories = ['All', 'Computers', 'Accessories', 'Monitors'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (product) => {
    addToCart(product);
    setAddedFeedback(product.id);
    setTimeout(() => setAddedFeedback(null), 1000);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 text-white shadow-md">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-3">
          Official Tech Store
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Essential Hardware & Workspace Gear
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl">
          Browse our selection of laptops, monitors, and peripherals. Add items to your cart and checkout easily.
        </p>
      </div>

      {/* Category Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isJustAdded = addedFeedback === product.id;
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-44 bg-slate-100 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 text-xs font-semibold text-slate-700">
                    {product.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900">{product.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{product.description}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-100 mt-2">
                <div>
                  <span className="text-xs text-slate-400 block">Price</span>
                  <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => handleAdd(product)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isJustAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isJustAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}