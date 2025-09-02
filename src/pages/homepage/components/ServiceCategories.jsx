import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ServiceCategories = ({ language }) => {
  const content = {
    en: {
      title: "Our IoT Services",
      subtitle: "Professional technical support for all your IoT device needs",
      services: [
        {
          id: 'smart-sensor',
          icon: 'Thermometer',
          title: 'Smart Sensor Setup',
          description: 'Temperature, humidity, motion, and environmental sensor configuration and calibration',
          features: ['Device Configuration', 'Network Integration', 'Data Analytics Setup']
        },
        {
          id: 'smart-switch',
          icon: 'ToggleLeft',
          title: 'Smart Switch & Plug',
          description: 'Smart switch installation, plug configuration, and automation setup',
          features: ['Installation Service', 'App Integration', 'Schedule Programming']
        },
        {
          id: 'gateway-hub',
          icon: 'Router',
          title: 'Gateway & Hub',
          description: 'Central hub setup, device pairing, and network optimization',
          features: ['Hub Configuration', 'Device Pairing', 'Network Optimization']
        },
        {
          id: 'security-device',
          icon: 'Shield',
          title: 'Security Devices',
          description: 'Smart cameras, door locks, and security system installation',
          features: ['Camera Setup', 'Access Control', 'Alert Configuration']
        },
        {
          id: 'network-setup',
          icon: 'Wifi',
          title: 'Network Installation',
          description: 'IoT network setup, troubleshooting, and performance optimization',
          features: ['Network Design', 'Troubleshooting', 'Performance Tuning']
        },
        {
          id: 'debugging',
          icon: 'Bug',
          title: 'Device Debugging',
          description: 'Comprehensive troubleshooting and repair services for malfunctioning devices',
          features: ['Issue Diagnosis', 'Repair Service', 'Performance Testing']
        }
      ]
    },
    th: {
      title: "บริการ IoT ของเรา",
      subtitle: "การสนับสนุนทางเทคนิคแบบมืออาชีพสำหรับความต้องการอุปกรณ์ IoT ทั้งหมดของคุณ",
      services: [
        {
          id: 'smart-sensor',
          icon: 'Thermometer',
          title: 'ติดตั้งเซ็นเซอร์อัจฉริยะ',
          description: 'การกำหนดค่าและปรับเทียบเซ็นเซอร์อุณหภูมิ ความชื้น การเคลื่อนไหว และสิ่งแวดล้อม',
          features: ['การกำหนดค่าอุปกรณ์', 'การรวมเครือข่าย', 'การตั้งค่าการวิเคราะห์ข้อมูล']
        },
        {
          id: 'smart-switch',
          icon: 'ToggleLeft',
          title: 'สวิตช์และปลั๊กอัจฉริยะ',
          description: 'การติดตั้งสวิตช์อัจฉริยะ การกำหนดค่าปลั๊ก และการตั้งค่าระบบอัตโนมัติ',
          features: ['บริการติดตั้ง', 'การรวมแอป', 'การเขียนโปรแกรมตารางเวลา']
        },
        {
          id: 'gateway-hub',
          icon: 'Router',
          title: 'เกตเวย์และฮับ',
          description: 'การตั้งค่าฮับกลาง การจับคู่อุปกรณ์ และการปรับปรุงเครือข่าย',
          features: ['การกำหนดค่าฮับ', 'การจับคู่อุปกรณ์', 'การปรับปรุงเครือข่าย']
        },
        {
          id: 'security-device',
          icon: 'Shield',
          title: 'อุปกรณ์รักษาความปลอดภัย',
          description: 'การติดตั้งกล้องอัจฉริยะ ล็อคประตู และระบบรักษาความปลอดภัย',
          features: ['การตั้งค่ากล้อง', 'การควบคุมการเข้าถึง', 'การกำหนดค่าการแจ้งเตือน']
        },
        {
          id: 'network-setup',
          icon: 'Wifi',
          title: 'การติดตั้งเครือข่าย',
          description: 'การตั้งค่าเครือข่าย IoT การแก้ไขปัญหา และการปรับปรุงประสิทธิภาพ',
          features: ['การออกแบบเครือข่าย', 'การแก้ไขปัญหา', 'การปรับแต่งประสิทธิภาพ']
        },
        {
          id: 'debugging',
          icon: 'Bug',
          title: 'การแก้ไขข้อบกพร่องอุปกรณ์',
          description: 'บริการแก้ไขปัญหาและซ่อมแซมที่ครอบคลุมสำหรับอุปกรณ์ที่ทำงานผิดปกติ',
          features: ['การวินิจฉัยปัญหา', 'บริการซ่อมแซม', 'การทดสอบประสิทธิภาพ']
        }
      ]
    }
  };

  const currentContent = content?.[language] || content?.en;

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {currentContent?.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {currentContent?.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent?.services?.map((service) => (
            <Link
              key={service?.id}
              to={`/service-booking-form?category=${service?.id}`}
              className="group"
            >
              <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/20 card-shadow hover:elevated-shadow smooth-transition h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 smooth-transition">
                  <Icon name={service?.icon} size={32} className="text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary smooth-transition">
                  {service?.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service?.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Arrow Icon */}
                <div className="flex items-center justify-end mt-6">
                  <Icon 
                    name="ArrowRight" 
                    size={20} 
                    className="text-primary group-hover:translate-x-1 smooth-transition" 
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;