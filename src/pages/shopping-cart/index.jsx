import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CartHeader from './components/CartHeader';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';

const ShoppingCart = () => {
  const [language, setLanguage] = useState('en');
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      // Mock cart data for demonstration
      const mockCartItems = [
        {
          id: 1,
          name: language === 'en' ? 'Smart Temperature Sensor' : 'เซ็นเซอร์วัดอุณหภูมิอัจฉริยะ',
          category: language === 'en' ? 'Smart Sensors' : 'เซ็นเซอร์อัจฉริยะ',
          price: 1299,
          originalPrice: 1599,
          quantity: 2,
          stock: 15,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
          variant: language === 'en' ? 'Wireless' : 'ไร้สาย'
        },
        {
          id: 2,
          name: language === 'en' ? 'Smart WiFi Switch' : 'สวิตช์ WiFi อัจฉริยะ',
          category: language === 'en' ? 'Smart Switch & Plug' : 'สวิตช์และปลั๊กอัจฉริยะ',
          price: 899,
          quantity: 1,
          stock: 8,
          image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop',
          variant: language === 'en' ? '2-Gang' : '2 ช่อง'
        },
        {
          id: 3,
          name: language === 'en' ? 'IoT Gateway Hub' : 'เกตเวย์ฮับ IoT',
          category: language === 'en' ? 'Gateway & Hub' : 'เกตเวย์และฮับ',
          price: 2499,
          quantity: 1,
          stock: 5,
          image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400&h=400&fit=crop',
          variant: language === 'en' ? 'Pro Model' : 'รุ่น Pro'
        }
      ];
      setCartItems(mockCartItems);
    }
  }, [language]);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems?.map(item =>
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems?.filter(item => item?.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyPromoCode = (code) => {
    // Mock promo code application
    console.log('Applied promo code:', code);
  };

  const proceedToCheckout = () => {
    setIsLoading(true);
    // Mock checkout process
    setTimeout(() => {
      setIsLoading(false);
      alert(language === 'en' ?'Checkout functionality would be implemented here. Redirecting to payment gateway...' :'ฟังก์ชันการชำระเงินจะถูกพัฒนาที่นี่ กำลังเปลี่ยนเส้นทางไปยังเกตเวย์การชำระเงิน...'
      );
    }, 2000);
  };

  // Calculate totals
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const tax = subtotal * 0.07; // 7% tax
  const shipping = subtotal >= 1500 ? 0 : 100; // Free shipping over ฿1,500
  const discount = 0; // Would be calculated based on applied promo codes
  const total = subtotal + tax + shipping - discount;

  const cartItemCount = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={cartItemCount}
        isAuthenticated={true}
      />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CartHeader
            itemCount={cartItemCount}
            language={language}
            onClearCart={clearCart}
          />

          {cartItems?.length === 0 ? (
            <EmptyCart language={language} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems?.map((item) => (
                    <CartItem
                      key={item?.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemoveItem={removeItem}
                      language={language}
                    />
                  ))}
                </div>

                {/* Mobile Order Summary */}
                <div className="lg:hidden mt-8">
                  <OrderSummary
                    subtotal={subtotal}
                    tax={tax}
                    shipping={shipping}
                    discount={discount}
                    total={total}
                    onApplyPromoCode={applyPromoCode}
                    onProceedToCheckout={proceedToCheckout}
                    language={language}
                    isLoading={isLoading}
                  />
                </div>
              </div>

              {/* Desktop Order Summary */}
              <div className="hidden lg:block">
                <OrderSummary
                  subtotal={subtotal}
                  tax={tax}
                  shipping={shipping}
                  discount={discount}
                  total={total}
                  onApplyPromoCode={applyPromoCode}
                  onProceedToCheckout={proceedToCheckout}
                  language={language}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}

          {/* Trust Signals */}
          {cartItems?.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {language === 'en' ? 'Secure Payment' : 'การชำระเงินปลอดภัย'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'SSL encrypted checkout' : 'การชำระเงินเข้ารหัส SSL'}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {language === 'en' ? 'Fast Delivery' : 'จัดส่งรวดเร็ว'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? '2-3 business days' : '2-3 วันทำการ'}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {language === 'en' ? 'Easy Returns' : 'คืนสินค้าง่าย'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? '30-day return policy' : 'นโยบายคืนสินค้า 30 วัน'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;