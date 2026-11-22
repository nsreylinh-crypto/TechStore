import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

export default function OrderConfirmationPage({ order, onContinueShopping }) {
  if (!order) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-emerald-600 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">Order Placed Successfully!</h1>
          <p className="text-emerald-100 text-sm mt-1">
            Thank you for shopping with TechStore. Your order has been recorded.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
            <div>
              <span className="text-xs text-slate-400 block">Order ID</span>
              <span className="font-bold text-slate-900 font-mono">{order.orderId}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Order Date</span>
              <span className="font-semibold text-slate-900">{order.orderDate}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Order Status</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 mt-0.5">
                <Clock className="w-3 h-3" />
                {order.status}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Total Amount</span>
              <span className="font-bold text-indigo-600">${order.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <h3 className="font-bold text-slate-900">Customer & Delivery Details</h3>
            <p className="text-slate-700">
              <span className="font-medium">Customer Name:</span> {order.customer.firstName} {order.customer.lastName}
            </p>
            <p className="text-slate-600">
              <span className="font-medium">Phone:</span> {order.customer.phone} | <span className="font-medium">Email:</span> {order.customer.email}
            </p>
            <p className="text-slate-600">
              <span className="font-medium">Location:</span> {order.customer.location}
            </p>
            <p className="text-slate-600">
              <span className="font-medium">Address:</span> {order.customer.address}
            </p>
            <p className="text-slate-600">
              <span className="font-medium">Shipping Carrier:</span> {order.shippingCarrier.name} (${order.shippingCarrier.price.toFixed(2)})
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3">Ordered Products</h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Product</th>
                    <th className="py-2.5 px-4 text-center">QTY</th>
                    <th className="py-2.5 px-4 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2.5 px-4 font-medium text-slate-900">{item.name}</td>
                      <td className="py-2.5 px-4 text-center text-slate-600">{item.quantity}</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={onContinueShopping}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}