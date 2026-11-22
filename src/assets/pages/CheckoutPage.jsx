import React, { useState } from 'react';
import { ArrowLeft, Truck, MapPin, ShieldCheck } from 'lucide-react';

export default function CheckoutPage({ cart, subtotal, setCurrentPage, onPlaceOrder }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    shippingMethod: 'virak_buntham',
  });

  const [errors, setErrors] = useState({});

  const shippingOptions = [
    { id: 'virak_buntham', name: 'Virak Buntham Express', desc: '1-2 business days nationwide', price: 2.5 },
    { id: 'jnt', name: 'J&T Express', desc: '1-3 business days door-to-door', price: 2.0 },
  ];

  const selectedShipping = shippingOptions.find((s) => s.id === formData.shippingMethod) || shippingOptions[0];
  const grandTotal = subtotal + selectedShipping.price;

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.location.trim()) newErrors.location = 'Location (Province/City) is required';
    if (!formData.address.trim()) newErrors.address = 'Detailed address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onPlaceOrder({
      customer: formData,
      shippingCarrier: selectedShipping,
      items: cart,
      subtotal,
      grandTotal,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
          <p className="text-sm text-slate-500 mt-1">Enter your location and select a shipping carrier</p>
        </div>
        <button
          onClick={() => setCurrentPage('cart')}
          className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Details */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Customer Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                />
                {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                />
                {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  Location (Province / City / Branch) *
                </span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Phnom Penh, Siem Reap, Battambang"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              />
              {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Address *</label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Street number, House number, Sangkat/Commune..."
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              />
              {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
            </div>
          </div>

          {/* Shipping Carrier Selection */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-600" />
              <span>Select Shipping Carrier</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shippingOptions.map((option) => {
                const isSelected = formData.shippingMethod === option.id;
                return (
                  <label
                    key={option.id}
                    className={`cursor-pointer border rounded-xl p-4 flex items-start justify-between transition-all ${
                      isSelected ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={isSelected}
                        onChange={() => setFormData({ ...formData, shippingMethod: option.id })}
                        className="mt-1 text-indigo-600"
                      />
                      <div>
                        <span className="font-bold text-sm text-slate-900 block">{option.name}</span>
                        <span className="text-xs text-slate-500">{option.desc}</span>
                      </div>
                    </div>
                    <span className="font-bold text-sm text-slate-900">${option.price.toFixed(2)}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit space-y-5">
          <h3 className="font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h3>
          <div className="space-y-3 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} <span className="text-slate-400">x{item.quantity}</span>
                </span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Carrier ({selectedShipping.name})</span>
              <span>${selectedShipping.price.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-100 pt-2.5 flex justify-between text-base font-bold text-slate-900">
              <span>Grand Total</span>
              <span className="text-indigo-600">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Place Order</span>
          </button>
        </div>
      </form>
    </div>
  );
}