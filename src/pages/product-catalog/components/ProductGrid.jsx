import React from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';

const ProductGrid = ({ products, onAddToCart, language = 'th', isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 })?.map((_, index) => (
          <div key={index} className="bg-card rounded-lg border border-border animate-pulse">
            <div className="h-48 bg-muted rounded-t-lg"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-muted rounded w-20"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Package" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {language === 'th' ? 'ไม่พบสินค้า' : 'No products found'}
        </h3>
        <p className="text-muted-foreground max-w-md">
          {language === 'th' ?'ลองปรับเปลี่ยนตัวกรองหรือคำค้นหาเพื่อดูสินค้าอื่น ๆ' :'Try adjusting your filters or search terms to see other products'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard
          key={product?.id}
          product={product}
          onAddToCart={onAddToCart}
          language={language}
        />
      ))}
    </div>
  );
};

export default ProductGrid;