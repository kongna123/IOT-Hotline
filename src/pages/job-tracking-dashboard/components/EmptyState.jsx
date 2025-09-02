import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const EmptyState = ({ type = 'no-jobs', onRetry, language }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-jobs':
        return {
          icon: 'Briefcase',
          title: language === 'th' ? 'ไม่มีงานในระบบ' : 'No Jobs Found',
          description: language === 'th' ?'คุณยังไม่มีงานในระบบ เริ่มต้นด้วยการจองบริการ IoT ของเรา' :'You don\'t have any jobs in the system yet. Start by booking our IoT services.',
          actionText: language === 'th' ? 'จองบริการ' : 'Book Service',
          actionLink: '/service-booking-form'
        };
      case 'no-search-results':
        return {
          icon: 'SearchX',
          title: language === 'th' ? 'ไม่พบผลลัพธ์' : 'No Results Found',
          description: language === 'th' ?'ไม่พบงานที่ตรงกับคำค้นหาของคุณ กรุณาลองใช้คำค้นหาอื่น' :'No jobs match your search criteria. Please try different search terms.',
          actionText: language === 'th' ? 'ลองอีกครั้ง' : 'Try Again',
          actionLink: null
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          title: language === 'th' ? 'เกิดข้อผิดพลาด' : 'Something Went Wrong',
          description: language === 'th' ?'ไม่สามารถโหลดข้อมูลงานได้ กรุณาลองใหม่อีกครั้ง' :'Unable to load job data. Please try again.',
          actionText: language === 'th' ? 'ลองใหม่' : 'Retry',
          actionLink: null
        };
      default:
        return {
          icon: 'HelpCircle',
          title: language === 'th' ? 'ไม่มีข้อมูล' : 'No Data',
          description: language === 'th' ? 'ไม่มีข้อมูลที่จะแสดง' : 'No data to display',
          actionText: language === 'th' ? 'รีเฟรช' : 'Refresh',
          actionLink: null
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon */}
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name={content?.icon} size={40} className="text-muted-foreground" />
      </div>
      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
        {content?.title}
      </h3>
      {/* Description */}
      <p className="text-muted-foreground text-center max-w-md mb-8 leading-relaxed">
        {content?.description}
      </p>
      {/* Action Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        {content?.actionLink ? (
          <Link to={content?.actionLink}>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
            >
              {content?.actionText}
            </Button>
          </Link>
        ) : (
          <Button
            variant="default"
            onClick={onRetry}
            iconName="RefreshCw"
            iconPosition="left"
          >
            {content?.actionText}
          </Button>
        )}

        {/* Secondary Action */}
        {type === 'no-search-results' && (
          <Link to="/service-booking-form">
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
            >
              {language === 'th' ? 'จองบริการใหม่' : 'Book New Service'}
            </Button>
          </Link>
        )}
      </div>
      {/* Additional Help */}
      <div className="mt-8 p-4 bg-muted rounded-lg max-w-md">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">
              {language === 'th' ? 'ต้องการความช่วยเหลือ?' : 'Need Help?'}
            </p>
            <p className="text-muted-foreground">
              {language === 'th' ?'ติดต่อทีมสนับสนุนของเราได้ตลอด 24 ชั่วโมง' :'Contact our support team 24/7 for assistance'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;