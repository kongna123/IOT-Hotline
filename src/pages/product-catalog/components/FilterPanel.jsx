import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';


const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onToggle, 
  language = 'th',
  productCount = 0 
}) => {
  const categories = [
    { value: 'all', label: language === 'th' ? 'ทั้งหมด' : 'All Categories' },
    { value: 'smart-sensors', label: language === 'th' ? 'เซ็นเซอร์อัจฉริยะ' : 'Smart Sensors' },
    { value: 'smart-switch', label: language === 'th' ? 'สวิตช์และปลั๊กอัจฉริยะ' : 'Smart Switch & Plug' },
    { value: 'gateway-hub', label: language === 'th' ? 'เกตเวย์และฮับ' : 'Gateway & Hub' },
    { value: 'security', label: language === 'th' ? 'อุปกรณ์รักษาความปลอดภัย' : 'Security Devices' },
    { value: 'network', label: language === 'th' ? 'อุปกรณ์เครือข่าย' : 'Network Equipment' }
  ];

  const brands = [
    { value: 'xiaomi', label: 'Xiaomi' },
    { value: 'tp-link', label: 'TP-Link' },
    { value: 'sonoff', label: 'Sonoff' },
    { value: 'tuya', label: 'Tuya' },
    { value: 'shelly', label: 'Shelly' },
    { value: 'aqara', label: 'Aqara' }
  ];

  const sortOptions = [
    { value: 'popular', label: language === 'th' ? 'ยอดนิยม' : 'Most Popular' },
    { value: 'price-low', label: language === 'th' ? 'ราคาต่ำ-สูง' : 'Price: Low to High' },
    { value: 'price-high', label: language === 'th' ? 'ราคาสูง-ต่ำ' : 'Price: High to Low' },
    { value: 'newest', label: language === 'th' ? 'ใหม่ล่าสุด' : 'Newest First' },
    { value: 'rating', label: language === 'th' ? 'คะแนนสูงสุด' : 'Highest Rated' }
  ];

  const handlePriceChange = (field, value) => {
    onFilterChange('priceRange', {
      ...filters?.priceRange,
      [field]: parseInt(value) || 0
    });
  };

  const handleBrandChange = (brand, checked) => {
    const updatedBrands = checked
      ? [...filters?.brands, brand]
      : filters?.brands?.filter(b => b !== brand);
    onFilterChange('brands', updatedBrands);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          {language === 'th' ? 'ตัวกรอง' : 'Filters'}
        </h3>
        <span className="text-sm text-muted-foreground">
          {productCount} {language === 'th' ? 'รายการ' : 'items'}
        </span>
      </div>

      {/* Sort */}
      <div>
        <Select
          label={language === 'th' ? 'เรียงตาม' : 'Sort by'}
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
          className="mb-4"
        />
      </div>

      {/* Category Filter */}
      <div>
        <Select
          label={language === 'th' ? 'หมวดหมู่' : 'Category'}
          options={categories}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
          className="mb-4"
        />
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-foreground mb-3">
          {language === 'th' ? 'ช่วงราคา (฿)' : 'Price Range (฿)'}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder={language === 'th' ? 'ต่ำสุด' : 'Min'}
            value={filters?.priceRange?.min || ''}
            onChange={(e) => handlePriceChange('min', e?.target?.value)}
          />
          <Input
            type="number"
            placeholder={language === 'th' ? 'สูงสุด' : 'Max'}
            value={filters?.priceRange?.max || ''}
            onChange={(e) => handlePriceChange('max', e?.target?.value)}
          />
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h4 className="font-medium text-foreground mb-3">
          {language === 'th' ? 'แบรนด์' : 'Brand'}
        </h4>
        <div className="space-y-2">
          {brands?.map((brand) => (
            <Checkbox
              key={brand?.value}
              label={brand?.label}
              checked={filters?.brands?.includes(brand?.value)}
              onChange={(e) => handleBrandChange(brand?.value, e?.target?.checked)}
            />
          ))}
        </div>
      </div>

      {/* Stock Filter */}
      <div>
        <Checkbox
          label={language === 'th' ? 'มีสินค้าในสต็อกเท่านั้น' : 'In stock only'}
          checked={filters?.inStockOnly}
          onChange={(e) => onFilterChange('inStockOnly', e?.target?.checked)}
        />
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        fullWidth
        onClick={onClearFilters}
        iconName="RotateCcw"
        iconPosition="left"
      >
        {language === 'th' ? 'ล้างตัวกรอง' : 'Clear Filters'}
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          fullWidth
        >
          {language === 'th' ? 'ตัวกรอง' : 'Filters'} ({productCount})
        </Button>
      </div>

      {/* Desktop Filter Panel */}
      <div className="hidden lg:block">
        <div className="bg-card rounded-lg border border-border p-6 card-shadow sticky top-20">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-80 bg-card border-r border-border shadow-lg overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">
                  {language === 'th' ? 'ตัวกรอง' : 'Filters'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  iconName="X"
                />
              </div>
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;