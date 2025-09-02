import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingSpinner = ({ message, language }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Spinning Icon */}
      <div className="relative">
        <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="Loader2" size={20} className="text-primary animate-spin" />
        </div>
      </div>

      {/* Loading Message */}
      <div className="mt-6 text-center">
        <p className="text-lg font-medium text-foreground mb-2">
          {message || (language === 'th' ? 'กำลังโหลด...' : 'Loading...')}
        </p>
        <p className="text-sm text-muted-foreground">
          {language === 'th' ?'กรุณารอสักครู่ เรากำลังดึงข้อมูลล่าสุดให้คุณ' :'Please wait while we fetch the latest information for you'
          }
        </p>
      </div>

      {/* Loading Dots Animation */}
      <div className="flex space-x-1 mt-4">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

export default LoadingSpinner;