import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroBanner = ({ language }) => {
  const content = {
    en: {
      title: "Professional IoT within reach",
      subtitle: "Connect with certified technicians for device troubleshooting and shop premium IoT equipment - all in one platform",
      serviceButton: "Book Service",
      shopButton: "Shop Products",
      trustBadge: "Trusted by 10,000+ customers",
      features: [
        "24/7 Technical Support",
        "Certified IoT Technicians", 
        "Premium Equipment"
      ]
    },
    th: {
      title: "โซลูชัน IoT มืออาชีพ ใกล้แค่เอื้อม",
      subtitle: "เชื่อมต่อกับช่างเทคนิคที่ได้รับการรับรองสำหรับการแก้ไขปัญหาอุปกรณ์ และช้อปอุปกรณ์ IoT พรีเมียม - ทั้งหมดในแพลตฟอร์มเดียว",
      serviceButton: "จองบริการ",
      shopButton: "ช้อปสินค้า",
      trustBadge: "ได้รับความไว้วางใจจากลูกค้า 10,000+ ราย",
      features: [
        "สนับสนุนเทคนิค 24/7",
        "ช่างเทคนิค IoT ที่ได้รับการรับรong",
        "อุปกรณ์พรีเมียม"
      ]
    }
  };

  const currentContent = content?.[language] || content?.en;

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-accent rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-secondary rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-primary rounded-full"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Icon name="Zap" size={16} className="mr-2" />
              {currentContent?.trustBadge}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {currentContent?.title}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              {currentContent?.subtitle}
            </p>

            {/* Feature List */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
              {currentContent?.features?.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-muted-foreground">
                  <Icon name="Check" size={16} className="text-success mr-2" />
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/service-booking-form">
                <Button 
                  variant="default" 
                  size="lg" 
                  iconName="Wrench" 
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  {currentContent?.serviceButton}
                </Button>
              </Link>
              
              <Link to="/product-catalog">
                <Button 
                  variant="outline" 
                  size="lg" 
                  iconName="ShoppingBag" 
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  {currentContent?.shopButton}
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                alt="IoT technician working with smart devices"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl card-shadow"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-card p-4 rounded-xl card-shadow border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Wifi" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Connected</p>
                    <p className="text-xs text-muted-foreground">24 Devices</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-xl card-shadow border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Secure</p>
                    <p className="text-xs text-muted-foreground">Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;