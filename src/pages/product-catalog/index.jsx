import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import AddToCartModal from './components/AddToCartModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProductCatalog = () => {
  const [language, setLanguage] = useState('th');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    category: 'all',
    brands: [],
    priceRange: { min: 0, max: 0 },
    inStockOnly: false,
    sortBy: 'popular'
  });

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "เซ็นเซอร์อุณหภูมิและความชื้น Xiaomi Mi Temperature",
      brand: "Xiaomi",
      category: "smart-sensors",
      price: 590,
      originalPrice: 690,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      rating: 4.5,
      reviews: 128,
      stock: 15,
      isNew: true,
      discount: 15,
      specifications: [
        "วัดอุณหภูมิ -20°C ถึง 60°C",
        "วัดความชื้น 0-100% RH",
        "แบตเตอรี่ใช้งาน 1 ปี",
        "เชื่อมต่อ Bluetooth 5.0"
      ],
      variants: [
        { id: 'white', name: 'สีขาว', description: 'รุ่นมาตรฐาน' },
        { id: 'black', name: 'สีดำ', description: 'รุ่นพิเศษ' }
      ]
    },
    {
      id: 2,
      name: "สวิตช์อัจฉริยะ TP-Link Kasa Smart WiFi Switch",
      brand: "TP-Link",
      category: "smart-switch",
      price: 1290,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
      rating: 4.3,
      reviews: 89,
      stock: 8,
      specifications: [
        "ควบคุมผ่าน WiFi",
        "รองรับ Alexa และ Google Assistant",
        "ตั้งเวลาเปิด-ปิดอัตโนมัติ",
        "ติดตั้งง่าย ไม่ต้องใช้ Hub"
      ]
    },
    {
      id: 3,
      name: "Gateway Zigbee 3.0 Tuya Smart Hub",
      brand: "Tuya",
      category: "gateway-hub",
      price: 2490,
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400",
      rating: 4.7,
      reviews: 156,
      stock: 12,
      isNew: true,
      specifications: [
        "รองรับ Zigbee 3.0",
        "เชื่อมต่ออุปกรณ์ได้สูงสุด 128 ตัว",
        "ควบคุมผ่าน Tuya Smart App",
        "รองรับ Voice Control"
      ]
    },
    {
      id: 4,
      name: "กล้องรักษาความปลอดภัย Xiaomi Mi Home Security Camera",
      brand: "Xiaomi",
      category: "security",
      price: 1890,
      originalPrice: 2190,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400",
      rating: 4.4,
      reviews: 203,
      stock: 0,
      discount: 14,
      specifications: [
        "ความละเอียด 1080p Full HD",
        "มุมมอง 360 องศา",
        "Night Vision อินฟราเรด",
        "บันทึกลง MicroSD หรือ Cloud"
      ]
    },
    {
      id: 5,
      name: "Router WiFi 6 TP-Link Archer AX1500",
      brand: "TP-Link",
      category: "network",
      price: 3590,
      image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400",
      rating: 4.6,
      reviews: 94,
      stock: 6,
      specifications: [
        "WiFi 6 (802.11ax)",
        "ความเร็วสูงสุด 1.5 Gbps",
        "4 พอร์ต Gigabit Ethernet",
        "รองรับ MU-MIMO และ OFDMA"
      ]
    },
    {
      id: 6,
      name: "เซ็นเซอร์ตรวจจับการเคลื่อนไหว Aqara Motion Sensor",
      brand: "Aqara",
      category: "smart-sensors",
      price: 890,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
      rating: 4.2,
      reviews: 67,
      stock: 20,
      specifications: [
        "ตรวจจับการเคลื่อนไหวระยะ 7 เมตร",
        "มุมตรวจจับ 170 องศา",
        "แบตเตอรี่ใช้งาน 2 ปี",
        "เชื่อมต่อ Zigbee 3.0"
      ]
    },
    {
      id: 7,
      name: "ปลั๊กอัจฉริยะ Sonoff S31 Smart Plug",
      brand: "Sonoff",
      category: "smart-switch",
      price: 690,
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
      rating: 4.1,
      reviews: 112,
      stock: 25,
      specifications: [
        "ควบคุมผ่าน eWeLink App",
        "วัดการใช้ไฟฟ้า",
        "รองรับ Alexa และ Google Home",
        "ตั้งเวลาและสร้างฉาก"
      ]
    },
    {
      id: 8,
      name: "สวิตช์ไฟอัจฉริยะ Shelly 1PM WiFi Relay",
      brand: "Shelly",
      category: "smart-switch",
      price: 1190,
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400",
      rating: 4.5,
      reviews: 78,
      stock: 10,
      isNew: true,
      specifications: [
        "รีเลย์ WiFi ขนาดเล็ก",
        "วัดการใช้ไฟฟ้าแบบเรียลไทม์",
        "ติดตั้งในกล่องสวิตช์",
        "API และ MQTT Support"
      ]
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'th';
    setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLanguage = localStorage.getItem('language') || 'th';
      setLanguage(savedLanguage);
    };

    window.addEventListener('storage', handleLanguageChange);
    return () => window.removeEventListener('storage', handleLanguageChange);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      brands: [],
      priceRange: { min: 0, max: 0 },
      inStockOnly: false,
      sortBy: 'popular'
    });
    setSearchQuery('');
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setIsAddToCartModalOpen(true);
  };

  const handleConfirmAddToCart = (cartItem) => {
    setCartItems(prev => {
      const existingItem = prev?.find(item => 
        item?.id === cartItem?.id && 
        item?.selectedVariant?.id === cartItem?.selectedVariant?.id
      );

      if (existingItem) {
        return prev?.map(item =>
          item?.id === cartItem?.id && item?.selectedVariant?.id === cartItem?.selectedVariant?.id
            ? { ...item, quantity: item?.quantity + cartItem?.quantity }
            : item
        );
      }

      return [...prev, { ...cartItem, cartId: Date.now() }];
    });
  };

  const filterProducts = (products) => {
    let filtered = [...products];

    // Search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(query) ||
        product?.brand?.toLowerCase()?.includes(query) ||
        product?.specifications?.some(spec => spec?.toLowerCase()?.includes(query))
      );
    }

    // Category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(product => product?.category === filters?.category);
    }

    // Brand filter
    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.brands?.includes(product?.brand?.toLowerCase()?.replace(/[^a-z0-9]/g, '-'))
      );
    }

    // Price range filter
    if (filters?.priceRange?.min > 0 || filters?.priceRange?.max > 0) {
      filtered = filtered?.filter(product => {
        const price = product?.price;
        const min = filters?.priceRange?.min || 0;
        const max = filters?.priceRange?.max || Infinity;
        return price >= min && price <= max;
      });
    }

    // Stock filter
    if (filters?.inStockOnly) {
      filtered = filtered?.filter(product => product?.stock > 0);
    }

    // Sort
    switch (filters?.sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => (b?.isNew ? 1 : 0) - (a?.isNew ? 1 : 0));
        break;
      default: // popular
        filtered?.sort((a, b) => b?.reviews - a?.reviews);
    }

    return filtered;
  };

  const filteredProducts = filterProducts(mockProducts);
  const totalCartItems = cartItems?.reduce((sum, item) => sum + item?.quantity, 0);

  return (
    <>
      <Helmet>
        <title>{language === 'th' ? 'แคตตาล็อกสินค้า - IoT ฮอตไลน์' : 'Product Catalog - IoT Hotline'}</title>
        <meta name="description" content={language === 'th' ? 'เลือกซื้ออุปกรณ์ IoT คุณภาพสูง เซ็นเซอร์อัจฉริยะ สวิตช์ WiFi อุปกรณ์รักษาความปลอดภัย และอุปกรณ์เครือข่าย' : 'Shop high-quality IoT devices including smart sensors, WiFi switches, security devices, and network equipment'} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header cartItemCount={totalCartItems} isAuthenticated={true} />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                <span>{language === 'th' ? 'หน้าแรก' : 'Home'}</span>
                <Icon name="ChevronRight" size={16} />
                <span className="text-foreground">
                  {language === 'th' ? 'แคตตาล็อกสินค้า' : 'Product Catalog'}
                </span>
              </div>
              
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {language === 'th' ? 'แคตตาล็อกสินค้า IoT' : 'IoT Product Catalog'}
                  </h1>
                  <p className="text-muted-foreground">
                    {language === 'th' ?'เลือกซื้ออุปกรณ์ IoT คุณภาพสูงสำหรับบ้านและธุรกิจของคุณ' :'Shop high-quality IoT devices for your home and business needs'
                    }
                  </p>
                </div>
                
                <div className="lg:w-96">
                  <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSearchSubmit={() => {}}
                    language={language}
                  />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filter Panel */}
              <div className="lg:w-80 flex-shrink-0">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  isOpen={isFilterOpen}
                  onToggle={() => setIsFilterOpen(!isFilterOpen)}
                  language={language}
                  productCount={filteredProducts?.length}
                />
              </div>

              {/* Product Grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">
                    {language === 'th' 
                      ? `แสดง ${filteredProducts?.length} รายการจากทั้งหมด ${mockProducts?.length} รายการ`
                      : `Showing ${filteredProducts?.length} of ${mockProducts?.length} products`
                    }
                  </p>
                  
                  {/* Quick Category Buttons */}
                  <div className="hidden md:flex items-center space-x-2">
                    {['all', 'smart-sensors', 'smart-switch', 'security']?.map((category) => (
                      <Button
                        key={category}
                        variant={filters?.category === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFilterChange('category', category)}
                      >
                        {category === 'all' && (language === 'th' ? 'ทั้งหมด' : 'All')}
                        {category === 'smart-sensors' && (language === 'th' ? 'เซ็นเซอร์' : 'Sensors')}
                        {category === 'smart-switch' && (language === 'th' ? 'สวิตช์' : 'Switches')}
                        {category === 'security' && (language === 'th' ? 'รักษาความปลอดภัย' : 'Security')}
                      </Button>
                    ))}
                  </div>
                </div>

                <ProductGrid
                  products={filteredProducts}
                  onAddToCart={handleAddToCart}
                  language={language}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Add to Cart Modal */}
        <AddToCartModal
          product={selectedProduct}
          isOpen={isAddToCartModalOpen}
          onClose={() => {
            setIsAddToCartModalOpen(false);
            setSelectedProduct(null);
          }}
          onConfirm={handleConfirmAddToCart}
          language={language}
        />
      </div>
    </>
  );
};

export default ProductCatalog;