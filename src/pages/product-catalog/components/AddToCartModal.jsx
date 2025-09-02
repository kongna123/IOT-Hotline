import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

import Image from '../../../components/AppImage';

const AddToCartModal = ({ product, isOpen, onClose, onConfirm, language = 'th' }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]?.id || '');

  if (!isOpen || !product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirm = () => {
    const selectedVariantData = product?.variants?.find(v => v?.id === selectedVariant);
    onConfirm({
      ...product,
      quantity,
      selectedVariant: selectedVariantData,
      totalPrice: product?.price * quantity
    });
    onClose();
    setQuantity(1);
    setSelectedVariant(product?.variants?.[0]?.id || '');
  };

  const variantOptions = product?.variants?.map(variant => ({
    value: variant?.id,
    label: variant?.name,
    description: variant?.description
  })) || [];

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              {language === 'th' ? 'เพิ่มลงตะกร้า' : 'Add to Cart'}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              className="h-8 w-8 p-0"
            />
          </div>

          {/* Product Info */}
          <div className="flex space-x-4 mb-6">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1 line-clamp-2">
                {product?.name}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {product?.brand}
              </p>
              <p className="font-semibold text-foreground">
                {formatPrice(product?.price)}
              </p>
            </div>
          </div>

          {/* Variants */}
          {variantOptions?.length > 0 && (
            <div className="mb-4">
              <Select
                label={language === 'th' ? 'เลือกรุ่น' : 'Select Variant'}
                options={variantOptions}
                value={selectedVariant}
                onChange={setSelectedVariant}
              />
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              {language === 'th' ? 'จำนวน' : 'Quantity'}
            </label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                iconName="Minus"
                className="h-10 w-10 p-0"
              />
              <Input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e?.target?.value);
                  if (value >= 1 && value <= product?.stock) {
                    setQuantity(value);
                  }
                }}
                className="w-20 text-center"
                min="1"
                max={product?.stock}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product?.stock}
                iconName="Plus"
                className="h-10 w-10 p-0"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {language === 'th' ? `มีสินค้า ${product?.stock} ชิ้น` : `${product?.stock} items available`}
            </p>
          </div>

          {/* Total */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">
                {language === 'th' ? 'รวมทั้งหมด' : 'Total'}
              </span>
              <span className="text-lg font-bold text-foreground">
                {formatPrice(product?.price * quantity)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              fullWidth
            >
              {language === 'th' ? 'ยกเลิก' : 'Cancel'}
            </Button>
            <Button
              variant="default"
              onClick={handleConfirm}
              iconName="ShoppingCart"
              iconPosition="left"
              fullWidth
            >
              {language === 'th' ? 'เพิ่มลงตะกร้า' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;