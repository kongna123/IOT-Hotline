import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductCard = ({ product, onAddToCart, language = 'th' }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return {
        text: language === 'th' ? 'สินค้าหมด' : 'Out of Stock',
        color: 'text-error',
        bgColor: 'bg-error/10'
      };
    } else if (stock <= 5) {
      return {
        text: language === 'th' ? `เหลือ ${stock} ชิ้น` : `${stock} left`,
        color: 'text-warning',
        bgColor: 'bg-warning/10'
      };
    }
    return {
      text: language === 'th' ? 'พร้อมส่ง' : 'In Stock',
      color: 'text-success',
      bgColor: 'bg-success/10'
    };
  };

  const stockStatus = getStockStatus(product?.stock);

  return (
    <div className="bg-card rounded-lg border border-border card-shadow hover:elevated-shadow smooth-transition group">
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
        />
        {product?.isNew && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
            {language === 'th' ? 'ใหม่' : 'New'}
          </div>
        )}
        {product?.discount && (
          <div className="absolute top-2 right-2 bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
            -{product?.discount}%
          </div>
        )}
        <div className={`absolute bottom-2 right-2 ${stockStatus?.bgColor} ${stockStatus?.color} text-xs font-medium px-2 py-1 rounded-full`}>
          {stockStatus?.text}
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-1">
            {product?.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-2">
            {product?.brand}
          </p>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-xs text-muted-foreground">
                {product?.rating} ({product?.reviews})
              </span>
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              {product?.category}
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-1">
            {product?.specifications?.slice(0, 2)?.map((spec, index) => (
              <div key={index} className="flex items-center">
                <Icon name="Check" size={12} className="text-success mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{spec}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product?.originalPrice)}
              </span>
            )}
            <span className="font-bold text-foreground">
              {formatPrice(product?.price)}
            </span>
          </div>
          
          <Button
            variant={product?.stock === 0 ? "outline" : "default"}
            size="sm"
            disabled={product?.stock === 0}
            onClick={() => onAddToCart(product)}
            iconName={product?.stock === 0 ? "AlertCircle" : "ShoppingCart"}
            iconPosition="left"
            iconSize={14}
          >
            {product?.stock === 0 
              ? (language === 'th' ? 'หมด' : 'Sold Out')
              : (language === 'th' ? 'เพิ่ม' : 'Add')
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;