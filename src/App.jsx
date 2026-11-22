import React, { useState } from 'react';
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import HomePage from "./assets/pages/HomePage";
import CartPage from "./assets/pages/CartPage";
import CheckoutPage from "./assets/pages/CheckoutPage";
import OrderConfirmationPage from "./assets/pages/OrderConfirmationPage";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Laptop',
    price: 650,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    description: 'High-performance laptop for work, coding, and everyday productivity.',
  },
  {
    id: 2,
    name: 'Mouse',
    price: 15,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    description: 'Ergonomic wireless optical mouse with precision tracking.',
  },
  {
    id: 3,
    name: 'Keyboard',
    price: 25,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    description: 'Tactile mechanical-feel wired keyboard with durable keycaps.',
  },
  {
    id: 4,
    name: 'Monitor',
    price: 120,
    category: 'Monitors',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    description: '24-inch Full HD IPS display with ultra-thin bezels.',
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [orderCounter, setOrderCounter] = useState(1);
  const [completedOrder, setCompletedOrder] = useState(null);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (orderDetails) => {
    const formattedId = `ORD-${String(orderCounter).padStart(4, '0')}`;
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    setCompletedOrder({
      orderId: formattedId,
      orderDate: today,
      status: 'Pending',
      ...orderDetails,
    });
    setOrderCounter((prev) => prev + 1);
    setCart([]);
    setCurrentPage('confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
      />

      <main className="grow max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {currentPage === 'home' && (
          <HomePage products={INITIAL_PRODUCTS} addToCart={addToCart} />
        )}
        {currentPage === 'cart' && (
          <CartPage
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            subtotal={subtotal}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'checkout' && (
          <CheckoutPage
            cart={cart}
            subtotal={subtotal}
            setCurrentPage={setCurrentPage}
            onPlaceOrder={handlePlaceOrder}
          />
        )}
        {currentPage === 'confirmation' && (
          <OrderConfirmationPage
            order={completedOrder}
            onContinueShopping={() => setCurrentPage('home')}
          />
        )}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}