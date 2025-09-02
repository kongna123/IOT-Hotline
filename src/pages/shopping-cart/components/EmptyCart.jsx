import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = ({ language }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        {language === 'en' ? 'Your cart is empty' : 'ตะกร้าสินค้าของคุณว่างเปล่า'}
      </h2>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        {language === 'en' ?'Looks like you haven\'t added any IoT devices to your cart yet. Start shopping to find the perfect smart solutions for your needs.'
          : 'ดูเหมือนว่าคุณยังไม่ได้เพิ่มอุปกรณ์ IoT ใดๆ ลงในตะกร้า เริ่มช้อปปิ้งเพื่อหาโซลูชันอัจฉริยะที่เหมาะกับความต้องการของคุณ'
        }
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="default"
          size="lg"
          asChild
          iconName="ShoppingBag"
          iconPosition="left"
        >
          <Link to="/product-catalog">
            {language === 'en' ? 'Browse Products' : 'เรียกดูสินค้า'}
          </Link>
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          asChild
          iconName="Wrench"
          iconPosition="left"
        >
          <Link to="/service-booking-form">
            {language === 'en' ? 'Book Service' : 'จองบริการ'}
          </Link>
        </Button>
      </div>
      {/* Popular Categories */}
      <div className="mt-12 w-full max-w-2xl">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          {language === 'en' ? 'Popular Categories' : 'หมวดหมู่ยอดนิยม'}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: language === 'en' ? 'Smart Sensors' : 'เซ็นเซอร์อัจฉริยะ', icon: 'Zap' },
            { name: language === 'en' ? 'Smart Switches' : 'สวิตช์อัจฉริยะ', icon: 'ToggleLeft' },
            { name: language === 'en' ? 'Security Devices' : 'อุปกรณ์รักษาความปลอดภัย', icon: 'Shield' },
            { name: language === 'en' ? 'Network Equipment' : 'อุปกรณ์เครือข่าย', icon: 'Wifi' }
          ]?.map((category, index) => (
            <Link
              key={index}
              to="/product-catalog"
              className="flex flex-col items-center p-4 bg-card rounded-lg border border-border hover:border-primary smooth-transition"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Icon name={category?.icon} size={24} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground text-center">
                {category?.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;