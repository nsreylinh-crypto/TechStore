import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CartPage({ cart, updateQuantity, removeFromCart, subtotal, setCurrentPage }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="text-sm text-slate-500 mt-1">Review and adjust quantities before checkout</p>
        </div>
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900">Your cart is empty</h3>
          <button
            onClick={() => setCurrentPage('home')}
            className="mt-4 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            {cart.map((item) => (
              <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-100 border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.category}</p>
                    <p className="text-sm font-semibold text-indigo-600 mt-1">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  {/* Quantity Controls: បាត់សញ្ញាដកនៅពេល quantity <= 1 */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    {item.quantity > 1 && (
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 text-slate-600 hover:bg-slate-200"
                        title="Decrease Quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <span className="px-3.5 py-1 text-sm font-bold text-slate-900 bg-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 text-slate-600 hover:bg-slate-200"
                      title="Increase Quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total & Remove */}
                  <div className="text-right min-w-20">
                    <div className="font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-500 hover:text-red-700 inline-flex items-center gap-1 mt-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit space-y-5">
            <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-100 pt-2.5 flex justify-between text-base font-bold text-slate-900">
                <span>Grand Total</span>
                <span className="text-indigo-600">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}