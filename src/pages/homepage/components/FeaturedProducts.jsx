import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturedProducts = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const content = {
    en: {
      title: "Featured IoT Products",
      subtitle: "Premium devices from trusted brands with professional installation support",
      viewAll: "View All Products",
      addToCart: "Add to Cart",
      currency: "฿"
    },
    th: {
      title: "สินค้า IoT แนะนำ",
      subtitle: "อุปกรณ์พรีเมียมจากแบรนด์ที่เชื่อถือได้พร้อมการสนับสนุนการติดตั้งแบบมืออาชีพ",
      viewAll: "ดูสินค้าทั้งหมด",
      addToCart: "เพิ่มลงตะกร้า",
      currency: "฿"
    }
  };

  const currentContent = content?.[language] || content?.en;

  const featuredProducts = [
    {
      id: 1,
      name: language === 'th' ? 'เซ็นเซอร์อุณหภูมิและความชื้น WiFi' : 'WiFi Temperature & Humidity Sensor',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
      category: language === 'th' ? 'เซ็นเซอร์อัจฉริยะ' : 'Smart Sensors',
      rating: 4.8,
      reviews: 124,
      badge: language === 'th' ? 'ขายดี' : 'Best Seller',
      features: language === 'th' ? ['การแจ้งเตือนแบบเรียลไทม์', 'แอปมือถือ', 'แบตเตอรี่ 2 ปี'] : ['Real-time Alerts', 'Mobile App', '2-Year Battery']
    },
    {
      id: 2,
      name: language === 'th' ? 'สวิตช์ไฟอัจฉริยะ WiFi' : 'Smart WiFi Light Switch',
      price: 899,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
      category: language === 'th' ? 'สวิตช์อัจฉริยะ' : 'Smart Switches',
      rating: 4.6,
      reviews: 89,
      badge: language === 'th' ? 'ใหม่' : 'New',
      features: language === 'th' ? ['ควบคุมด้วยเสียง', 'ตั้งเวลาได้', 'ติดตั้งง่าย'] : ['Voice Control', 'Timer Function', 'Easy Install']
    },
    {
      id: 3,
      name: language === 'th' ? 'กล้องรักษาความปลอดภัย WiFi 4K' : '4K WiFi Security Camera',
      price: 3299,
      originalPrice: 3899,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=300&fit=crop',
      category: language === 'th' ? 'อุปกรณ์รักษาความปลอดภัย' : 'Security Devices',
      rating: 4.9,
      reviews: 203,
      badge: language === 'th' ? 'แนะนำ' : 'Recommended',
      features: language === 'th' ? ['ความละเอียด 4K', 'การมองเห็นกลางคืน', 'การตรวจจับการเคลื่อนไหว'] : ['4K Resolution', 'Night Vision', 'Motion Detection']
    },
    {
      id: 4,
      name: language === 'th' ? 'ฮับ IoT อัจฉริยะ' : 'Smart IoT Hub',
      price: 2199,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
      category: language === 'th' ? 'เกตเวย์และฮับ' : 'Gateway & Hub',
      rating: 4.7,
      reviews: 156,
      badge: null,
      features: language === 'th' ? ['รองรับอุปกรณ์ 100 เครื่อง', 'การเชื่อมต่อหลายโปรโตคอล', 'การควบคุมในท้องถิ่น'] : ['Supports 100 Devices', 'Multi-Protocol', 'Local Control']
    },
    {
      id: 5,
      name: language === 'th' ? 'ปลั๊กอัจฉริยะ WiFi' : 'Smart WiFi Plug',
      price: 599,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop',
      category: language === 'th' ? 'สวิตช์อัจฉริยะ' : 'Smart Switches',
      rating: 4.5,
      reviews: 67,
      badge: language === 'th' ? 'ราคาดี' : 'Great Value',
      features: language === 'th' ? ['ควบคุมระยะไกล', 'การตรวจสอบพลังงาน', 'ขนาดกะทัดรัด'] : ['Remote Control', 'Energy Monitoring', 'Compact Size']
    }
  ];

  const itemsPerView = 3;
  const maxIndex = Math.max(0, featuredProducts?.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (scrollContainerRef?.current) {
      const itemWidth = scrollContainerRef?.current?.children?.[0]?.offsetWidth || 0;
      const gap = 32; // 2rem gap
      scrollContainerRef?.current?.scrollTo({
        left: currentIndex * (itemWidth + gap),
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH')?.format(price);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {currentContent?.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {currentContent?.subtitle}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Navigation Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="w-10 h-10"
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className="w-10 h-10"
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </div>
            
            <Link to="/product-catalog">
              <Button variant="outline" iconName="ArrowRight" iconPosition="right">
                {currentContent?.viewAll}
              </Button>
            </Link>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex space-x-8 overflow-x-hidden scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredProducts?.map((product) => (
              <div key={product?.id} className="flex-shrink-0 w-80">
                <div className="bg-card rounded-2xl border border-border card-shadow hover:elevated-shadow smooth-transition overflow-hidden group">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
                    />
                    
                    {/* Badge */}
                    {product?.badge && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                        {product?.badge}
                      </div>
                    )}
                    
                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 smooth-transition">
                      <Button variant="secondary" size="icon" className="w-8 h-8">
                        <Icon name="Heart" size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="text-sm text-muted-foreground mb-2">
                      {product?.category}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                      {product?.name}
                    </h3>

                    {/* Features */}
                    <div className="space-y-1 mb-4">
                      {product?.features?.slice(0, 2)?.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < Math.floor(product?.rating) ? 'text-accent fill-current' : 'text-muted-foreground/30'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">
                        {product?.rating} ({product?.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-foreground">
                          {currentContent?.currency}{formatPrice(product?.price)}
                        </span>
                        {product?.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {currentContent?.currency}{formatPrice(product?.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button 
                      variant="default" 
                      fullWidth 
                      iconName="ShoppingCart" 
                      iconPosition="left"
                      className="group-hover:bg-primary/90"
                    >
                      {currentContent?.addToCart}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 })?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full smooth-transition ${
                index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;