import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const CartHeader = ({ itemCount, language, onClearCart }) => {
  const handleClearCart = () => {
    if (window.confirm(language === 'en' ? 'Clear all items from cart?' : 'ล้างสินค้าทั้งหมดจากตะกร้า?')) {
      onClearCart();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {language === 'en' ? 'Shopping Cart' : 'ตะกร้าสินค้า'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'en' 
            ? `${itemCount} ${itemCount === 1 ? 'item' : 'items'} in your cart`
            : `${itemCount} รายการในตะกร้าของคุณ`
          }
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          asChild
          iconName="ArrowLeft"
          iconPosition="left"
        >
          <Link to="/product-catalog">
            {language === 'en' ? 'Continue Shopping' : 'ช้อปปิ้งต่อ'}
          </Link>
        </Button>

        {itemCount > 0 && (
          <Button
            variant="ghost"
            onClick={handleClearCart}
            className="text-error hover:text-error hover:bg-error/10"
            iconName="Trash2"
            iconPosition="left"
          >
            {language === 'en' ? 'Clear Cart' : 'ล้างตะกร้า'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartHeader;