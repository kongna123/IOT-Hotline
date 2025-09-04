import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = ({ language }) => {
  const currentYear = new Date()?.getFullYear();

  const content = {
    en: {
      company: {
        name: "IoT Hotline",
        description: "Thailand's leading IoT service platform connecting customers with certified technicians and premium equipment suppliers.",
        tagline: "Making IoT Simple & Reliable"
      },
      links: {
        services: {
          title: "Services",
          items: [
            { label: "Smart Sensor Setup", path: "/service-booking-form?category=smart-sensor" },
            { label: "Smart Switch Installation", path: "/service-booking-form?category=smart-switch" },
            { label: "Security Device Setup", path: "/service-booking-form?category=security-device" },
            { label: "Network Installation", path: "/service-booking-form?category=network-setup" }
          ]
        },
        products: {
          title: "Products",
          items: [
            { label: "Smart Sensors", path: "/product-catalog?category=sensors" },
            { label: "Smart Switches", path: "/product-catalog?category=switches" },
            { label: "Security Devices", path: "/product-catalog?category=security" },
            { label: "Gateway & Hubs", path: "/product-catalog?category=gateways" }
          ]
        },
        support: {
          title: "Support",
          items: [
            { label: "Track Your Job", path: "/job-tracking-dashboard" },
            { label: "Help Center", path: "/help" },
            { label: "Contact Us", path: "/contact" },
            { label: "Technical Support", path: "/support" }
          ]
        },
        company: {
          title: "Company",
          items: [
            { label: "About Us", path: "/about" },
            { label: "Careers", path: "/careers" },
            { label: "Privacy Policy", path: "/privacy" },
            { label: "Terms of Service", path: "/terms" }
          ]
        }
      },
      contact: {
        title: "Contact Info",
        phone: "+66 2 123 4567",
        email: "support@iothotline.co.th",
        address: "Bangkok, Thailand"
      },
      social: {
        title: "Follow Us"
      },
      copyright: `© ${currentYear} IoT Hotline. All rights reserved.`,
      certifications: "Certified by Thai IoT Association"
    },
    th: {
      company: {
        name: "IoT ฮอตไลน์",
        description: "แพลตฟอร์มบริการ IoT ชั้นนำของประเทศไทยที่เชื่อมต่อลูกค้ากับช่างเทคนิคที่ได้รับการรับรองและผู้จำหน่ายอุปกรณ์พรีเมียม",
        tagline: "ทำให้ IoT ง่ายและเชื่อถือได้"
      },
      links: {
        services: {
          title: "บริการ",
          items: [
            { label: "ติดตั้งเซ็นเซอร์อัจฉริยะ", path: "/service-booking-form?category=smart-sensor" },
            { label: "ติดตั้งสวิตช์อัจฉริยะ", path: "/service-booking-form?category=smart-switch" },
            { label: "ติดตั้งอุปกรณ์รักษาความปลอดภัย", path: "/service-booking-form?category=security-device" },
            { label: "ติดตั้งเครือข่าย", path: "/service-booking-form?category=network-setup" },
            { label: "คอร์สออนไลน์", path: "/online-courses" }

          ]
        },
        products: {
          title: "สินค้า",
          items: [
            { label: "เซ็นเซอร์อัจฉริยะ", path: "/product-catalog?category=sensors" },
            { label: "สวิตช์อัจฉริยะ", path: "/product-catalog?category=switches" },
            { label: "อุปกรณ์รักษาความปลอดภัย", path: "/product-catalog?category=security" },
            { label: "เกตเวย์และฮับ", path: "/product-catalog?category=gateways" }
          ]
        },
        support: {
          title: "การสนับสนุน",
          items: [
            { label: "ติดตามงานของคุณ", path: "/job-tracking-dashboard" },
            { label: "ศูนย์ช่วยเหลือ", path: "/help" },
            { label: "ติดต่อเรา", path: "/contact" },
            { label: "การสนับสนุนทางเทคนิค", path: "/support" }
          ]
        },
        company: {
          title: "บริษัท",
          items: [
            { label: "เกี่ยวกับเรา", path: "/about" },
            { label: "ร่วมงานกับเรา", path: "/careers" },
            { label: "นโยบายความเป็นส่วนตัว", path: "/privacy" },
            { label: "ข้อกำหนดการให้บริการ", path: "/terms" }
          ]
        }
      },
      contact: {
        title: "ข้อมูลติดต่อ",
        phone: "+66 2 123 4567",
        email: "support@iothotline.co.th",
        address: "กรุงเทพมหานคร, ประเทศไทย"
      },
      social: {
        title: "ติดตามเรา"
      },
      copyright: `© ${currentYear} IoT ฮอตไลน์ สงวนลิขสิทธิ์`,
      certifications: "ได้รับการรับรองจากสมาคม IoT ไทย"
    }
  };

  const currentContent = content?.[language] || content?.en;

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com/iothotline" },
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com/iothotline" },
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com/iothotline" },
    { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/company/iothotline" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com/iothotline" }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">  
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Zap " size={20} color="white" />
                </div>
                <span className="text-xl font-semibold">
                  {currentContent?.company?.name}
                </span>
              </div>
              
              <p className="text-background/80 mb-4 leading-relaxed">
                {currentContent?.company?.description}
              </p>
              
              <div className="inline-flex items-center px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6">
                <Icon name="Award" size={14} className="mr-2" />
                {currentContent?.company?.tagline}
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <span className="text-background/80">{currentContent?.contact?.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <span className="text-background/80">{currentContent?.contact?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-background/80">{currentContent?.contact?.address}</span>
                </div>
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">
                {currentContent?.links?.services?.title}
              </h3>
              <ul className="space-y-3">
                {currentContent?.links?.services?.items?.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item?.path}
                      className="text-background/80 hover:text-primary smooth-transition"
                    >
                      {item?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">
                {currentContent?.links?.products?.title}
              </h3>
              <ul className="space-y-3">
                {currentContent?.links?.products?.items?.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item?.path}
                      className="text-background/80 hover:text-primary smooth-transition"
                    >
                      {item?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">
                {currentContent?.links?.support?.title}
              </h3>
              <ul className="space-y-3">
                {currentContent?.links?.support?.items?.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item?.path}
                      className="text-background/80 hover:text-primary smooth-transition"
                    >
                      {item?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">
                {currentContent?.links?.company?.title}
              </h3>
              <ul className="space-y-3">
                {currentContent?.links?.company?.items?.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item?.path}
                      className="text-background/80 hover:text-primary smooth-transition"
                    >
                      {item?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media & Certifications */}
        <div className="py-8 border-t border-background/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            {/* Social Links */}
            <div className="mb-6 lg:mb-0">
              <h4 className="text-sm font-medium mb-4">
                {currentContent?.social?.title}
              </h4>
              <div className="flex space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary smooth-transition group"
                    aria-label={`Follow us on ${social?.name}`}
                  >
                    <Icon 
                      name={social?.icon} 
                      size={20} 
                      className="text-background/80 group-hover:text-white" 
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="text-center lg:text-right">
              <div className="inline-flex items-center px-4 py-2 bg-success/20 text-success rounded-full text-sm">
                <Icon name="Shield" size={16} className="mr-2" />
                {currentContent?.certifications}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-background/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-background/60 text-sm mb-4 md:mb-0">
              {currentContent?.copyright}
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-background/60">
              <Link to="/privacy" className="hover:text-primary smooth-transition">
                {language === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
              </Link>
              <Link to="/terms" className="hover:text-primary smooth-transition">
                {language === 'th' ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service'}
              </Link>
              <Link to="/cookies" className="hover:text-primary smooth-transition">
                {language === 'th' ? 'นโยบายคุกกี้' : 'Cookie Policy'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;