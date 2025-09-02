import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusProgressBar = ({ currentStatus, language }) => {
  const statuses = [
    {
      key: 'pending',
      label: language === 'th' ? 'รอดำเนินการ' : 'Pending',
      icon: 'Clock',
      description: language === 'th' ? 'รอการตอบรับ' : 'Waiting for acceptance'
    },
    {
      key: 'accepted',
      label: language === 'th' ? 'รับงานแล้ว' : 'Accepted',
      icon: 'CheckCircle',
      description: language === 'th' ? 'ช่างรับงานแล้ว' : 'Technician assigned'
    },
    {
      key: 'in-progress',
      label: language === 'th' ? 'กำลังดำเนินการ' : 'In Progress',
      icon: 'Settings',
      description: language === 'th' ? 'กำลังซ่อม' : 'Work in progress'
    },
    {
      key: 'completed',
      label: language === 'th' ? 'เสร็จสิ้น' : 'Completed',
      icon: 'CheckCircle2',
      description: language === 'th' ? 'งานเสร็จสิ้น' : 'Job completed'
    }
  ];

  const getCurrentStatusIndex = () => {
    return statuses?.findIndex(status => status?.key === currentStatus);
  };

  const currentIndex = getCurrentStatusIndex();

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        {language === 'th' ? 'สถานะงาน' : 'Job Status'}
      </h3>
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-muted">
          <div 
            className="h-full bg-primary smooth-transition"
            style={{ 
              width: currentIndex >= 0 ? `${(currentIndex / (statuses?.length - 1)) * 100}%` : '0%' 
            }}
          />
        </div>

        {/* Status Steps */}
        <div className="relative flex justify-between">
          {statuses?.map((status, index) => {
            const isActive = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={status?.key} className="flex flex-col items-center">
                {/* Status Icon */}
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-2 smooth-transition
                  ${isActive 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-background border-muted text-muted-foreground'
                  }
                  ${isCurrent ? 'ring-4 ring-primary/20' : ''}
                `}>
                  <Icon 
                    name={status?.icon} 
                    size={20} 
                    color={isActive ? 'white' : 'currentColor'} 
                  />
                </div>
                {/* Status Label */}
                <div className="mt-3 text-center">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {status?.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-20">
                    {status?.description}
                  </p>
                </div>
                {/* Current Status Indicator */}
                {isCurrent && (
                  <div className="mt-2 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {language === 'th' ? 'ปัจจุบัน' : 'Current'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Status Description */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              {language === 'th' ? 'สถานะปัจจุบัน' : 'Current Status'}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentIndex >= 0 ? statuses?.[currentIndex]?.description : 
                (language === 'th' ? 'ไม่พบสถานะ' : 'Status not found')
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusProgressBar;