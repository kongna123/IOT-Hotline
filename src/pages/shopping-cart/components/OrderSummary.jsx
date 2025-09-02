import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const OrderSummary = ({ 
  subtotal, 
  tax, 
  shipping, 
  discount, 
  total, 
  onApplyPromoCode, 
  onProceedToCheckout,
  language,
  isLoading = false
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2
    })?.format(price);
  };

  const handleApplyPromo = () => {
    if (!promoCode?.trim()) {
      setPromoError(language === 'en' ? 'Please enter a promo code' : 'กรุณาใส่รหัสส่วนลด');
      return;
    }

    // Mock promo code validation
    const validCodes = ['SAVE10', 'WELCOME20', 'IOT15'];
    if (validCodes?.includes(promoCode?.toUpperCase())) {
      setPromoError('');
      setPromoSuccess(language === 'en' ? 'Promo code applied successfully!' : 'ใช้รหัสส่วนลดสำเร็จ!');
      onApplyPromoCode(promoCode?.toUpperCase());
    } else {
      setPromoError(language === 'en' ? 'Invalid promo code' : 'รหัสส่วนลดไม่ถูกต้อง');
      setPromoSuccess('');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 card-shadow sticky top-24">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        {language === 'en' ? 'Order Summary' : 'สรุปคำสั่งซื้อ'}
      </h2>
      {/* Promo Code Section */}
      <div className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder={language === 'en' ? 'Enter promo code' : 'ใส่รหัสส่วนลด'}
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            disabled={isLoading}
          >
            <Icon name="Tag" size={16} className="mr-1" />
            {language === 'en' ? 'Apply' : 'ใช้'}
          </Button>
        </div>
        {promoError && (
          <p className="text-error text-sm mt-2 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {promoError}
          </p>
        )}
        {promoSuccess && (
          <p className="text-success text-sm mt-2 flex items-center">
            <Icon name="CheckCircle" size={14} className="mr-1" />
            {promoSuccess}
          </p>
        )}
      </div>
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">
            {language === 'en' ? 'Subtotal:' : 'รวมย่อย:'}
          </span>
          <span className="font-medium text-foreground">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">
            {language === 'en' ? 'Tax (7%):' : 'ภาษี (7%):'}
          </span>
          <span className="font-medium text-foreground">
            {formatPrice(tax)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">
            {language === 'en' ? 'Shipping:' : 'ค่าจัดส่ง:'}
          </span>
          <span className="font-medium text-foreground">
            {shipping === 0 ? (
              <span className="text-success">
                {language === 'en' ? 'Free' : 'ฟรี'}
              </span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">
              {language === 'en' ? 'Discount:' : 'ส่วนลด:'}
            </span>
            <span className="font-medium text-success">
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-foreground">
              {language === 'en' ? 'Total:' : 'รวมทั้งหมด:'}
            </span>
            <span className="text-xl font-bold text-primary">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
      {/* Shipping Info */}
      <div className="bg-muted/50 rounded-md p-3 mb-6">
        <div className="flex items-start gap-2">
          <Icon name="Truck" size={16} className="text-muted-foreground mt-0.5" />
          <div className="text-sm">
            <p className="text-foreground font-medium">
              {language === 'en' ? 'Free shipping on orders over ฿1,500' : 'จัดส่งฟรีเมื่อซื้อครบ ฿1,500'}
            </p>
            <p className="text-muted-foreground">
              {language === 'en' ? 'Estimated delivery: 2-3 business days' : 'ประมาณการจัดส่ง: 2-3 วันทำการ'}
            </p>
          </div>
        </div>
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={onProceedToCheckout}
        disabled={isLoading}
        loading={isLoading}
        iconName="CreditCard"
        iconPosition="left"
      >
        {language === 'en' ? 'Proceed to Checkout' : 'ดำเนินการชำระเงิน'}
      </Button>
      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
        <Icon name="Shield" size={14} />
        <span>
          {language === 'en' ? 'Secure checkout with SSL encryption' : 'ชำระเงินปลอดภัยด้วย SSL'}
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;