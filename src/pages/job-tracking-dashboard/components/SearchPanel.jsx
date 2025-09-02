import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SearchPanel = ({ onSearch, onFilterChange, language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('jobId');
  const [statusFilter, setStatusFilter] = useState('all');

  const searchTypeOptions = [
    { 
      value: 'jobId', 
      label: language === 'th' ? 'รหัสงาน' : 'Job ID' 
    },
    { 
      value: 'phone', 
      label: language === 'th' ? 'เบอร์โทรศัพท์' : 'Phone Number' 
    }
  ];

  const statusOptions = [
    { 
      value: 'all', 
      label: language === 'th' ? 'ทุกสถานะ' : 'All Status' 
    },
    { 
      value: 'pending', 
      label: language === 'th' ? 'รอดำเนินการ' : 'Pending' 
    },
    { 
      value: 'accepted', 
      label: language === 'th' ? 'รับงานแล้ว' : 'Accepted' 
    },
    { 
      value: 'in-progress', 
      label: language === 'th' ? 'กำลังดำเนินการ' : 'In Progress' 
    },
    { 
      value: 'completed', 
      label: language === 'th' ? 'เสร็จสิ้น' : 'Completed' 
    }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery, searchType);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    onFilterChange('status', value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('', searchType);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Search" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">
          {language === 'th' ? 'ค้นหางาน' : 'Search Jobs'}
        </h2>
      </div>
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Input Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Type Selector */}
          <div className="md:col-span-3">
            <Select
              label={language === 'th' ? 'ค้นหาโดย' : 'Search by'}
              options={searchTypeOptions}
              value={searchType}
              onChange={setSearchType}
            />
          </div>

          {/* Search Input */}
          <div className="md:col-span-6">
            <Input
              label={language === 'th' ? 'คำค้นหา' : 'Search term'}
              type="text"
              placeholder={
                searchType === 'jobId' 
                  ? (language === 'th' ? 'ใส่รหัสงาน เช่น JOB001' : 'Enter Job ID, e.g. JOB001')
                  : (language === 'th' ? 'ใส่เบอร์โทรศัพท์' : 'Enter phone number')
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
            />
          </div>

          {/* Search Button */}
          <div className="md:col-span-3 flex items-end">
            <div className="flex gap-2 w-full">
              <Button
                type="submit"
                variant="default"
                iconName="Search"
                iconPosition="left"
                className="flex-1"
              >
                {language === 'th' ? 'ค้นหา' : 'Search'}
              </Button>
              {searchQuery && (
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  onClick={handleClearSearch}
                  iconName="X"
                />
              )}
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
          {/* Status Filter */}
          <div>
            <Select
              label={language === 'th' ? 'กรองตามสถานะ' : 'Filter by Status'}
              options={statusOptions}
              value={statusFilter}
              onChange={handleStatusFilterChange}
            />
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-2 flex items-end">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSearchType('jobId');
                  setStatusFilter('all');
                  onSearch('', 'jobId');
                  onFilterChange('status', 'all');
                }}
                iconName="RotateCcw"
                iconPosition="left"
              >
                {language === 'th' ? 'รีเซ็ต' : 'Reset'}
              </Button>
            </div>
          </div>
        </div>
      </form>
      {/* Search Tips */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">
              {language === 'th' ? 'เคล็ดลับการค้นหา:' : 'Search Tips:'}
            </p>
            <ul className="space-y-1">
              <li>
                {language === 'th' ?'• ใช้รหัสงานเต็ม เช่น JOB001, JOB002' :'• Use complete Job ID like JOB001, JOB002'
                }
              </li>
              <li>
                {language === 'th' ?'• ใส่เบอร์โทรศัพท์ที่ใช้ในการจอง' :'• Enter the phone number used for booking'
                }
              </li>
              <li>
                {language === 'th' ?'• ใช้ตัวกรองเพื่อจำกัดผลลัพธ์' :'• Use filters to narrow down results'
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;