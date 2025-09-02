import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ContactSection = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    en: {
      title: "Get in Touch",
      subtitle: "Have questions? We\'re here to help with your IoT needs",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        message: "Your Message",
        submit: "Send Message",
        namePlaceholder: "Enter your full name",
        emailPlaceholder: "Enter your email address",
        phonePlaceholder: "Enter your phone number",
        messagePlaceholder: "Tell us how we can help you..."
      },
      contactInfo: [
        {
          icon: "Phone",
          title: "Phone Support",
          details: ["+66 2 123 4567", "+66 2 123 4568"],
          description: "24/7 Technical Hotline"
        },
        {
          icon: "Mail",
          title: "Email Support",
          details: ["support@iothotline.co.th", "sales@iothotline.co.th"],
          description: "Response within 2 hours"
        },
        {
          icon: "MapPin",
          title: "Service Areas",
          details: ["Bangkok & Metropolitan", "Major Cities Nationwide"],
          description: "On-site service available"
        },
        {
          icon: "Clock",
          title: "Business Hours",
          details: ["Mon-Fri: 8:00 AM - 8:00 PM", "Sat-Sun: 9:00 AM - 6:00 PM"],
          description: "Emergency support 24/7"
        }
      ],
      successMessage: "Thank you! Your message has been sent successfully.",
      errorMessage: "Please fill in all required fields."
    },
    th: {
      title: "ติดต่อเรา",
      subtitle: "มีคำถาม? เราพร้อมช่วยเหลือเกี่ยวกับความต้องการ IoT ของคุณ",
      form: {
        name: "ชื่อ-นามสกุล",
        email: "อีเมล",
        phone: "เบอร์โทรศัพท์",
        message: "ข้อความของคุณ",
        submit: "ส่งข้อความ",
        namePlaceholder: "กรอกชื่อ-นามสกุล",
        emailPlaceholder: "กรอกอีเมลของคุณ",
        phonePlaceholder: "กรอกเบอร์โทรศัพท์",
        messagePlaceholder: "บอกเราว่าเราสามารถช่วยคุณได้อย่างไร..."
      },
      contactInfo: [
        {
          icon: "Phone",
          title: "การสนับสนุนทางโทรศัพท์",
          details: ["+66 2 123 4567", "+66 2 123 4568"],
          description: "ฮอตไลน์เทคนิค 24/7"
        },
        {
          icon: "Mail",
          title: "การสนับสนุนทางอีเมล",
          details: ["support@iothotline.co.th", "sales@iothotline.co.th"],
          description: "ตอบกลับภายใน 2 ชั่วโมง"
        },
        {
          icon: "MapPin",
          title: "พื้นที่ให้บริการ",
          details: ["กรุงเทพฯ และปริมณฑล", "เมืองใหญ่ทั่วประเทศ"],
          description: "บริการถึงที่"
        },
        {
          icon: "Clock",
          title: "เวลาทำการ",
          details: ["จ.-ศ.: 8:00 - 20:00 น.", "ส.-อา.: 9:00 - 18:00 น."],
          description: "การสนับสนุนฉุกเฉิน 24/7"
        }
      ],
      successMessage: "ขอบคุณ! ข้อความของคุณถูกส่งเรียบร้อยแล้ว",
      errorMessage: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน"
    }
  };

  const currentContent = content?.[language] || content?.en;

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    // Basic validation
    if (!formData?.name || !formData?.email || !formData?.phone || !formData?.message) {
      alert(currentContent?.errorMessage);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert(currentContent?.successMessage);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {currentContent?.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {currentContent?.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-2xl border border-border card-shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label={currentContent?.form?.name}
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  placeholder={currentContent?.form?.namePlaceholder}
                  required
                />
                
                <Input
                  label={currentContent?.form?.email}
                  type="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  placeholder={currentContent?.form?.emailPlaceholder}
                  required
                />
              </div>

              <Input
                label={currentContent?.form?.phone}
                type="tel"
                name="phone"
                value={formData?.phone}
                onChange={handleInputChange}
                placeholder={currentContent?.form?.phonePlaceholder}
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {currentContent?.form?.message}
                </label>
                <textarea
                  name="message"
                  value={formData?.message}
                  onChange={handleInputChange}
                  placeholder={currentContent?.form?.messagePlaceholder}
                  rows={5}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
              >
                {currentContent?.form?.submit}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {currentContent?.contactInfo?.map((info, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={info?.icon} size={24} className="text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {info?.title}
                  </h3>
                  
                  <div className="space-y-1 mb-2">
                    {info?.details?.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                  
                  <p className="text-sm text-primary font-medium">
                    {info?.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden card-shadow">
              <div className="h-64">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="IoT Hotline Office Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=13.7563,100.5018&z=14&output=embed"
                  className="border-0"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {language === 'th' ?'สำนักงานใหญ่ กรุงเทพมหานคร' :'Head Office, Bangkok'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;