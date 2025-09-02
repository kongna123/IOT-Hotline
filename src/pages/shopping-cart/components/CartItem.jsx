import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, language }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item?.id, newQuantity);
  };

  const handleRemove = () => {
    if (window.confirm(language === 'en' ? 'Remove this item from cart?' : 'ลบสินค้านี้จากตะกร้า?')) {
      onRemoveItem(item?.id);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2
    })?.format(price);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-card rounded-lg border border-border card-shadow">
      {/* Product Image */}
      <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={item?.image}
          alt={item?.name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Product Details */}
      <div className="flex-1 min-w-0 w-full">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground line-clamp-2">
              {item?.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {language === 'en' ? 'Category:' : 'หมวดหมู่:'} {item?.category}
            </p>
            {item?.variant && (
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? 'Variant:' : 'รุ่น:'} {item?.variant}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-semibold text-foreground">
              {formatPrice(item?.price)}
            </p>
            {item?.originalPrice && item?.originalPrice > item?.price && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(item?.originalPrice)}
              </p>
            )}
          </div>
        </div>

        {/* Quantity Controls and Remove */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {language === 'en' ? 'Quantity:' : 'จำนวน:'}
            </span>
            <div className="flex items-center border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(item?.quantity - 1)}
                disabled={item?.quantity <= 1}
                className="h-8 w-8 p-0"
              >
                <Icon name="Minus" size={16} />
              </Button>
              <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center">
                {item?.quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(item?.quantity + 1)}
                disabled={item?.quantity >= item?.stock}
                className="h-8 w-8 p-0"
              >
                <Icon name="Plus" size={16} />
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-error hover:text-error hover:bg-error/10"
          >
            <Icon name="Trash2" size={16} className="mr-1" />
            {language === 'en' ? 'Remove' : 'ลบ'}
          </Button>
        </div>

        {/* Stock Warning */}
        {item?.quantity >= item?.stock && (
          <p className="text-xs text-warning mt-2">
            {language === 'en' ? 'Maximum quantity reached' : 'จำนวนสูงสุดแล้ว'}
          </p>
        )}

        {/* Subtotal */}
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
          <span className="text-sm text-muted-foreground">
            {language === 'en' ? 'Subtotal:' : 'รวมย่อย:'}
          </span>
          <span className="text-lg font-semibold text-foreground">
            {formatPrice(item?.price * item?.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;