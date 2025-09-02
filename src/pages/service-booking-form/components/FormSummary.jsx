import React from 'react';
import Icon from '../../../components/AppIcon';

const FormSummary = ({ formData, selectedCategory, selectedSubCategory, selectedDate, selectedTime, files }) => {
  const categoryLabels = {
    'smart-sensor': 'Smart Sensor',
    'smart-switch': 'Smart Switch & Plug',
    'gateway-hub': 'Gateway & Hub',
    'security-device': 'Security Device',
    'network': 'Network Equipment'
  };

  const subCategoryLabels = {
    'temperature': 'เซ็นเซอร์อุณหภูมิ',
    'humidity': 'เซ็นเซอร์ความชื้น',
    'motion': 'เซ็นเซอร์ตรวจจับการเคลื่อนไหว',
    'door-window': 'เซ็นเซอร์ประตู-หน้าต่าง',
    'smoke': 'เซ็นเซอร์ควัน',
    'wall-switch': 'สวิตช์ติดผนัง',
    'smart-plug': 'ปลั๊กอัจฉริยะ',
    'dimmer': 'สวิตช์ปรับแสง',
    'timer-switch': 'สวิตช์ตั้งเวลา',
    'zigbee-hub': 'Zigbee Hub',
    'wifi-gateway': 'WiFi Gateway',
    'bluetooth-hub': 'Bluetooth Hub',
    'multi-protocol': 'Multi-Protocol Hub',
    'ip-camera': 'กล้อง IP',
    'doorbell': 'กริ่งประตูอัจฉริยะ',
    'alarm-system': 'ระบบสัญญาณเตือน',
    'access-control': 'ระบบควบคุมการเข้าออก',
    'router': 'เราเตอร์',
    'mesh-system': 'ระบบ Mesh WiFi',
    'access-point': 'Access Point',
    'network-switch': 'Network Switch'
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString)?.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const timeSlots = {
      '09:00': '09:00 - 11:00',
      '11:00': '11:00 - 13:00',
      '13:00': '13:00 - 15:00',
      '15:00': '15:00 - 17:00',
      '17:00': '17:00 - 19:00'
    };
    return timeSlots?.[timeString] || timeString;
  };

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="FileText" size={20} className="mr-2" />
        สรุปข้อมูลการจอง
      </h3>
      <div className="space-y-4">
        {/* Customer Information */}
        <div className="border-b border-border pb-4">
          <h4 className="font-medium text-foreground mb-2">ข้อมูลลูกค้า</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">ชื่อ-นามสกุล:</span>
              <span className="ml-2 text-foreground">{formData?.fullName || '-'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">โทรศัพท์:</span>
              <span className="ml-2 text-foreground">{formData?.phone || '-'}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-muted-foreground">อีเมล:</span>
              <span className="ml-2 text-foreground">{formData?.email || '-'}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-muted-foreground">ที่อยู่:</span>
              <span className="ml-2 text-foreground">{formData?.address || '-'}</span>
            </div>
          </div>
        </div>

        {/* Service Information */}
        <div className="border-b border-border pb-4">
          <h4 className="font-medium text-foreground mb-2">ประเภทบริการ</h4>
          <div className="text-sm space-y-1">
            <div>
              <span className="text-muted-foreground">หมวดหมู่:</span>
              <span className="ml-2 text-foreground">
                {selectedCategory ? categoryLabels?.[selectedCategory] : '-'}
              </span>
            </div>
            {selectedSubCategory && (
              <div>
                <span className="text-muted-foreground">ประเภทอุปกรณ์:</span>
                <span className="ml-2 text-foreground">
                  {subCategoryLabels?.[selectedSubCategory] || selectedSubCategory}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Problem Description */}
        {formData?.problemDescription && (
          <div className="border-b border-border pb-4">
            <h4 className="font-medium text-foreground mb-2">รายละเอียดปัญหา</h4>
            <p className="text-sm text-foreground bg-muted p-3 rounded-md">
              {formData?.problemDescription}
            </p>
          </div>
        )}

        {/* Appointment */}
        <div className="border-b border-border pb-4">
          <h4 className="font-medium text-foreground mb-2">วันและเวลานัดหมาย</h4>
          <div className="text-sm space-y-1">
            <div>
              <span className="text-muted-foreground">วันที่:</span>
              <span className="ml-2 text-foreground">{formatDate(selectedDate) || '-'}</span>
            </div>
            <div>
              <span className="text-muted-foreground">เวลา:</span>
              <span className="ml-2 text-foreground">{formatTime(selectedTime) || '-'}</span>
            </div>
          </div>
        </div>

        {/* Attached Files */}
        {files?.length > 0 && (
          <div>
            <h4 className="font-medium text-foreground mb-2">ไฟล์แนบ</h4>
            <div className="space-y-2">
              {files?.map((file, index) => (
                <div key={file?.id} className="flex items-center text-sm">
                  <Icon 
                    name={file?.type?.startsWith('image/') ? 'Image' : 'FileVideo'} 
                    size={16} 
                    className="text-muted-foreground mr-2" 
                  />
                  <span className="text-foreground">{file?.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSummary;