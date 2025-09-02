import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const JobCard = ({ job, onContactTechnician, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'accepted':
        return 'bg-primary text-primary-foreground';
      case 'in-progress':
        return 'bg-accent text-accent-foreground';
      case 'completed':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    if (language === 'th') {
      switch (status) {
        case 'pending': return 'รอดำเนินการ';
        case 'accepted': return 'รับงานแล้ว';
        case 'in-progress': return 'กำลังดำเนินการ';
        case 'completed': return 'เสร็จสิ้น';
        default: return status;
      }
    }
    return status?.charAt(0)?.toUpperCase() + status?.slice(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (language === 'th') {
      return date?.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return date?.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow hover:elevated-shadow smooth-transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground">
              {language === 'th' ? 'งาน' : 'Job'} #{job?.id}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job?.status)}`}>
              {getStatusText(job?.status)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            {language === 'th' ? 'หมวดหมู่:' : 'Category:'} {job?.category}
          </p>
          <p className="text-sm text-muted-foreground">
            {language === 'th' ? 'วันที่สร้าง:' : 'Created:'} {formatDate(job?.createdAt)}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
        >
          {language === 'th' ? 'รายละเอียด' : 'Details'}
        </Button>
      </div>
      {/* Progress Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {language === 'th' ? 'ความคืบหน้า' : 'Progress'}
          </span>
          <span className="text-sm text-muted-foreground">
            {job?.progress}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full smooth-transition"
            style={{ width: `${job?.progress}%` }}
          />
        </div>
      </div>
      {/* Basic Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
          <p className="text-sm text-foreground">{job?.location}</p>
        </div>
        <div className="flex items-start gap-2">
          <Icon name="Clock" size={16} className="text-muted-foreground mt-0.5" />
          <p className="text-sm text-foreground">
            {language === 'th' ? 'เวลาที่คาดว่าจะเสร็จ:' : 'Estimated completion:'} {formatDate(job?.estimatedCompletion)}
          </p>
        </div>
      </div>
      {/* Technician Info */}
      {job?.technician && (
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg mb-4">
          <div className="flex items-center gap-3">
            <Image
              src={job?.technician?.avatar}
              alt={job?.technician?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-foreground">{job?.technician?.name}</p>
              <p className="text-sm text-muted-foreground">
                {language === 'th' ? 'ช่างเทคนิค' : 'Technician'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onContactTechnician(job?.technician)}
            iconName="Phone"
            iconPosition="left"
          >
            {language === 'th' ? 'ติดต่อ' : 'Contact'}
          </Button>
        </div>
      )}
      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border pt-4 space-y-4">
          {/* Problem Description */}
          <div>
            <h4 className="font-medium text-foreground mb-2">
              {language === 'th' ? 'รายละเอียดปัญหา' : 'Problem Description'}
            </h4>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              {job?.description}
            </p>
          </div>

          {/* Uploaded Files */}
          {job?.attachments && job?.attachments?.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2">
                {language === 'th' ? 'ไฟล์แนบ' : 'Attachments'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {job?.attachments?.map((file, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={file?.url}
                      alt={`Attachment ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg border border-border"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 smooth-transition rounded-lg flex items-center justify-center">
                      <Icon name="Eye" size={20} color="white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status History */}
          <div>
            <h4 className="font-medium text-foreground mb-2">
              {language === 'th' ? 'ประวัติสถานะ' : 'Status History'}
            </h4>
            <div className="space-y-2">
              {job?.statusHistory?.map((status, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(status?.status)?.replace('text-', 'bg-')?.split(' ')?.[0]}`} />
                  <span className="text-foreground font-medium">{getStatusText(status?.status)}</span>
                  <span className="text-muted-foreground">-</span>
                  <span className="text-muted-foreground">{formatDate(status?.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {job?.notes && (
            <div>
              <h4 className="font-medium text-foreground mb-2">
                {language === 'th' ? 'หมายเหตุ' : 'Notes'}
              </h4>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                {job?.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobCard;