import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateTimeSelector = ({ selectedDate, selectedTime, onDateChange, onTimeChange, errors }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);

  const timeSlots = [
    { value: '09:00', label: '09:00 - 11:00' },
    { value: '11:00', label: '11:00 - 13:00' },
    { value: '13:00', label: '13:00 - 15:00' },
    { value: '15:00', label: '15:00 - 17:00' },
    { value: '17:00', label: '17:00 - 19:00' }
  ];

  useEffect(() => {
    // Simulate checking available time slots for selected date
    if (selectedDate) {
      const dayOfWeek = new Date(selectedDate)?.getDay();
      // Weekend has fewer slots
      const slots = dayOfWeek === 0 || dayOfWeek === 6 
        ? timeSlots?.slice(0, 3) 
        : timeSlots;
      setAvailableSlots(slots);
    }
  }, [selectedDate]);

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === new Date(selectedDate)?.toDateString();
  };

  const handleDateClick = (date) => {
    if (isDateDisabled(date)) return;
    onDateChange(date?.toISOString()?.split('T')?.[0]);
    onTimeChange(''); // Reset time when date changes
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const dayNames = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        เลือกวันและเวลานัดหมาย
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth(-1)}
              iconName="ChevronLeft"
            />
            <h4 className="font-medium text-foreground">
              {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear() + 543}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth(1)}
              iconName="ChevronRight"
            />
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames?.map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth)?.map((date, index) => (
              <button
                key={index}
                onClick={() => date && handleDateClick(date)}
                disabled={isDateDisabled(date)}
                className={`
                  aspect-square p-2 text-sm rounded-md smooth-transition
                  ${!date ? 'invisible' : ''}
                  ${isDateDisabled(date) 
                    ? 'text-muted-foreground cursor-not-allowed' 
                    : 'hover:bg-primary/10 cursor-pointer'
                  }
                  ${isDateSelected(date) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground'
                  }
                `}
              >
                {date?.getDate()}
              </button>
            ))}
          </div>
          
          {errors?.date && (
            <p className="text-error text-sm mt-2">{errors?.date}</p>
          )}
        </div>

        {/* Time Slots */}
        <div>
          <h4 className="font-medium text-foreground mb-4">
            เลือกช่วงเวลา
            {selectedDate && (
              <span className="text-sm text-muted-foreground ml-2">
                ({new Date(selectedDate)?.toLocaleDateString('th-TH')})
              </span>
            )}
          </h4>
          
          {!selectedDate ? (
            <div className="text-center py-8">
              <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">กรุณาเลือกวันที่ก่อน</p>
            </div>
          ) : (
            <div className="space-y-2">
              {availableSlots?.map(slot => (
                <button
                  key={slot?.value}
                  onClick={() => onTimeChange(slot?.value)}
                  className={`
                    w-full p-3 text-left rounded-md border smooth-transition
                    ${selectedTime === slot?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{slot?.label}</span>
                    <Icon 
                      name={selectedTime === slot?.value ? 'CheckCircle' : 'Circle'} 
                      size={20}
                      className={selectedTime === slot?.value ? 'text-primary' : 'text-muted-foreground'}
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {errors?.time && (
            <p className="text-error text-sm mt-2">{errors?.time}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;