import React from 'react';
import { Monitor } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-indigo-600 text-white flex items-center justify-center">
            <Monitor className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900">TechStore</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
          <button onClick={() => setCurrentPage('home')} className="hover:text-indigo-600">
            Catalog
          </button>
          <button onClick={() => setCurrentPage('cart')} className="hover:text-indigo-600">
            Shopping Cart
          </button>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} TechStore E-Commerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
}