import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit, language = 'th' }) => {
  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearchSubmit();
  };

  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Input
          type="search"
          placeholder={language === 'th' ? 'ค้นหาสินค้า IoT...' : 'Search IoT products...'}
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="pr-20"
        />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              iconName="X"
              className="h-8 w-8 p-0"
            />
          )}
          
          <Button
            type="submit"
            variant="default"
            size="sm"
            iconName="Search"
            className="h-8 w-8 p-0"
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;