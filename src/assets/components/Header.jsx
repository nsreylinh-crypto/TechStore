import React from 'react';
import { ShoppingCart, Monitor } from 'lucide-react';

export default function Header({ currentPage, setCurrentPage, totalItems }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-slate-900">TechStore</span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
              React Shop
            </span>
          </div>
        </button>

        <nav className="flex items-center gap-6">
          <button
            onClick={() => setCurrentPage('home')}
            className={`text-sm font-medium transition-colors ${
              currentPage === 'home' ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Products
          </button>

          <button
            onClick={() => setCurrentPage('cart')}
            className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              currentPage === 'cart'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span
                className={`ml-0.5 px-1.5 py-0.2 text-xs font-bold rounded-full ${
                  currentPage === 'cart' ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'
                }`}
              >
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}