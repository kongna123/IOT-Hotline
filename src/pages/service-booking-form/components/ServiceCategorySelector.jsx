import React from 'react';
import Select from '../../../components/ui/Select';

const ServiceCategorySelector = ({ selectedCategory, selectedSubCategory, onCategoryChange, onSubCategoryChange, error }) => {
  const serviceCategories = [
    { value: 'smart-sensor', label: 'Smart Sensor' },
    { value: 'smart-switch', label: 'Smart Switch & Plug' },
    { value: 'gateway-hub', label: 'Gateway & Hub' },
    { value: 'security-device', label: 'Security Device' },
    { value: 'network', label: 'Network Equipment' }
  ];

  const subCategoryOptions = {
    'smart-sensor': [
      { value: 'temperature', label: 'เซ็นเซอร์อุณหภูมิ' },
      { value: 'humidity', label: 'เซ็นเซอร์ความชื้น' },
      { value: 'motion', label: 'เซ็นเซอร์ตรวจจับการเคลื่อนไหว' },
      { value: 'door-window', label: 'เซ็นเซอร์ประตู-หน้าต่าง' },
      { value: 'smoke', label: 'เซ็นเซอร์ควัน' }
    ],
    'smart-switch': [
      { value: 'wall-switch', label: 'สวิตช์ติดผนัง' },
      { value: 'smart-plug', label: 'ปลั๊กอัจฉริยะ' },
      { value: 'dimmer', label: 'สวิตช์ปรับแสง' },
      { value: 'timer-switch', label: 'สวิตช์ตั้งเวลา' }
    ],
    'gateway-hub': [
      { value: 'zigbee-hub', label: 'Zigbee Hub' },
      { value: 'wifi-gateway', label: 'WiFi Gateway' },
      { value: 'bluetooth-hub', label: 'Bluetooth Hub' },
      { value: 'multi-protocol', label: 'Multi-Protocol Hub' }
    ],
    'security-device': [
      { value: 'ip-camera', label: 'กล้อง IP' },
      { value: 'doorbell', label: 'กริ่งประตูอัจฉริยะ' },
      { value: 'alarm-system', label: 'ระบบสัญญาณเตือน' },
      { value: 'access-control', label: 'ระบบควบคุมการเข้าออก' }
    ],
    'network': [
      { value: 'router', label: 'เราเตอร์' },
      { value: 'mesh-system', label: 'ระบบ Mesh WiFi' },
      { value: 'access-point', label: 'Access Point' },
      { value: 'network-switch', label: 'Network Switch' }
    ]
  };

  const currentSubOptions = selectedCategory ? subCategoryOptions?.[selectedCategory] || [] : [];

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        เลือกประเภทบริการ
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="หมวดหมู่หลัก"
          placeholder="เลือกหมวดหมู่บริการ"
          options={serviceCategories}
          value={selectedCategory}
          onChange={onCategoryChange}
          error={error}
          required
        />
        
        {selectedCategory && (
          <Select
            label="ประเภทอุปกรณ์"
            placeholder="เลือกประเภทอุปกรณ์"
            options={currentSubOptions}
            value={selectedSubCategory}
            onChange={onSubCategoryChange}
            required
          />
        )}
      </div>
    </div>
  );
};

export default ServiceCategorySelector;