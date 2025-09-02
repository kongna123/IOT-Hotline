import React from 'react';
import Input from '../../../components/ui/Input';

const CustomerInfoForm = ({ formData, errors, onChange }) => {
  const handleInputChange = (field) => (e) => {
    onChange(field, e?.target?.value);
  };

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        ข้อมูลลูกค้า
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="ชื่อ-นามสกุล"
          type="text"
          placeholder="กรุณากรอกชื่อ-นามสกุล"
          value={formData?.fullName}
          onChange={handleInputChange('fullName')}
          error={errors?.fullName}
          required
          className="col-span-1 md:col-span-2"
        />
        
        <Input
          label="หมายเลขโทรศัพท์"
          type="tel"
          placeholder="08X-XXX-XXXX"
          value={formData?.phone}
          onChange={handleInputChange('phone')}
          error={errors?.phone}
          required
        />
        
        <Input
          label="อีเมล"
          type="email"
          placeholder="example@email.com"
          value={formData?.email}
          onChange={handleInputChange('email')}
          error={errors?.email}
          required
        />
        
        <Input
          label="ที่อยู่"
          type="text"
          placeholder="กรุณากรอกที่อยู่สำหรับให้บริการ"
          value={formData?.address}
          onChange={handleInputChange('address')}
          error={errors?.address}
          required
          className="col-span-1 md:col-span-2"
        />
      </div>
    </div>
  );
};

export default CustomerInfoForm;