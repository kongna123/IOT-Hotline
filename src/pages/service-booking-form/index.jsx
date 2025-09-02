import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CustomerInfoForm from './components/CustomerInfoForm';
import ServiceCategorySelector from './components/ServiceCategorySelector';
import ProblemDescriptionForm from './components/ProblemDescriptionForm';
import FileUploadComponent from './components/FileUploadComponent';
import DateTimeSelector from './components/DateTimeSelector';
import FormSummary from './components/FormSummary';

const ServiceBookingForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState('th');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data states
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    problemDescription: ''
  });

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Error states
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'th';
    setLanguage(savedLanguage);
  }, []);

  const steps = [
    { id: 1, title: language === 'th' ? 'ข้อมูลลูกค้า' : 'Customer Info', icon: 'User' },
    { id: 2, title: language === 'th' ? 'เลือกบริการ' : 'Service Selection', icon: 'Settings' },
    { id: 3, title: language === 'th' ? 'อธิบายปัญหา' : 'Problem Description', icon: 'MessageSquare' },
    { id: 4, title: language === 'th' ? 'แนบไฟล์' : 'File Upload', icon: 'Upload' },
    { id: 5, title: language === 'th' ? 'เลือกวันเวลา' : 'Date & Time', icon: 'Calendar' },
    { id: 6, title: language === 'th' ? 'ยืนยันข้อมูล' : 'Confirmation', icon: 'CheckCircle' }
  ];

  const handleFormDataChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubCategory(''); // Reset sub-category when main category changes
    if (errors?.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  };

  const handleSubCategoryChange = (value) => {
    setSelectedSubCategory(value);
  };

  const handleProblemDescriptionChange = (value) => {
    setFormData(prev => ({ ...prev, problemDescription: value }));
    if (errors?.problemDescription) {
      setErrors(prev => ({ ...prev, problemDescription: '' }));
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (errors?.date) {
      setErrors(prev => ({ ...prev, date: '' }));
    }
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    if (errors?.time) {
      setErrors(prev => ({ ...prev, time: '' }));
    }
  };

  const handleFilesChange = (files) => {
    setUploadedFiles(files);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.fullName?.trim()) {
          newErrors.fullName = 'กรุณากรอกชื่อ-นามสกุล';
        }
        if (!formData?.phone?.trim()) {
          newErrors.phone = 'กรุณากรอกหมายเลขโทรศัพท์';
        } else if (!/^[0-9]{10}$/?.test(formData?.phone?.replace(/[-\s]/g, ''))) {
          newErrors.phone = 'รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง';
        }
        if (!formData?.email?.trim()) {
          newErrors.email = 'กรุณากรอกอีเมล';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
          newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
        }
        if (!formData?.address?.trim()) {
          newErrors.address = 'กรุณากรอกที่อยู่';
        }
        break;

      case 2:
        if (!selectedCategory) {
          newErrors.category = 'กรุณาเลือกประเภทบริการ';
        }
        break;

      case 3:
        if (!formData?.problemDescription?.trim()) {
          newErrors.problemDescription = 'กรุณาอธิบายปัญหาที่พบ';
        } else if (formData?.problemDescription?.trim()?.length < 20) {
          newErrors.problemDescription = 'กรุณาอธิบายปัญหาให้ละเอียดมากขึ้น (อย่างน้อย 20 ตัวอักษร)';
        }
        break;

      case 5:
        if (!selectedDate) {
          newErrors.date = 'กรุณาเลือกวันที่';
        }
        if (!selectedTime) {
          newErrors.time = 'กรุณาเลือกเวลา';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock job ID
      const jobId = `JOB${Date.now()?.toString()?.slice(-6)}`;
      
      // Store job data in localStorage for tracking
      const jobData = {
        id: jobId,
        customerInfo: formData,
        serviceCategory: selectedCategory,
        serviceSubCategory: selectedSubCategory,
        problemDescription: formData?.problemDescription,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        attachedFiles: uploadedFiles?.length,
        status: 'pending',
        createdAt: new Date()?.toISOString(),
        estimatedCost: Math.floor(Math.random() * 2000) + 500 // Mock cost 500-2500 THB
      };

      const existingJobs = JSON.parse(localStorage.getItem('serviceJobs') || '[]');
      existingJobs?.push(jobData);
      localStorage.setItem('serviceJobs', JSON.stringify(existingJobs));

      // Navigate to job tracking with job ID
      navigate(`/job-tracking-dashboard?jobId=${jobId}`, {
        state: { newBooking: true, jobId }
      });

    } catch (error) {
      console.error('Submission error:', error);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CustomerInfoForm
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
          />
        );

      case 2:
        return (
          <ServiceCategorySelector
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            onCategoryChange={handleCategoryChange}
            onSubCategoryChange={handleSubCategoryChange}
            error={errors?.category}
          />
        );

      case 3:
        return (
          <ProblemDescriptionForm
            description={formData?.problemDescription}
            onChange={handleProblemDescriptionChange}
            error={errors?.problemDescription}
          />
        );

      case 4:
        return (
          <FileUploadComponent
            files={uploadedFiles}
            onFilesChange={handleFilesChange}
            error={errors?.files}
          />
        );

      case 5:
        return (
          <DateTimeSelector
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
            errors={{ date: errors?.date, time: errors?.time }}
          />
        );

      case 6:
        return (
          <FormSummary
            formData={formData}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            files={uploadedFiles}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {language === 'th' ? 'จองบริการช่างเทคนิค IoT' : 'Book IoT Technician Service'}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === 'th' ?'กรอกข้อมูลเพื่อจองบริการช่างเทคนิคผู้เชี่ยวชาญด้าน IoT สำหรับการติดตั้ง ซ่อมแซม และแก้ไขปัญหาอุปกรณ์อัจฉริยะของคุณ' :'Fill out the form to book our expert IoT technician services for installation, repair, and troubleshooting of your smart devices'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-card border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              {steps?.map((step, index) => (
                <div key={step?.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 smooth-transition
                    ${currentStep >= step?.id 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-border text-muted-foreground'
                    }
                  `}>
                    {currentStep > step?.id ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step?.icon} size={20} />
                    )}
                  </div>
                  
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step?.title}
                    </p>
                  </div>
                  
                  {index < steps?.length - 1 && (
                    <div className={`
                      hidden md:block w-12 h-0.5 mx-4 smooth-transition
                      ${currentStep > step?.id ? 'bg-primary' : 'bg-border'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                {language === 'th' ? 'ย้อนกลับ' : 'Previous'}
              </Button>

              <div className="text-sm text-muted-foreground">
                {language === 'th' ? 'ขั้นตอนที่' : 'Step'} {currentStep} {language === 'th' ? 'จาก' : 'of'} {steps?.length}
              </div>

              {currentStep < steps?.length ? (
                <Button
                  onClick={handleNextStep}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  {language === 'th' ? 'ถัดไป' : 'Next'}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="right"
                  variant="default"
                >
                  {isSubmitting 
                    ? (language === 'th' ? 'กำลังส่งข้อมูล...' : 'Submitting...') 
                    : (language === 'th' ? 'ยืนยันการจอง' : 'Confirm Booking')
                  }
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-muted py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {language === 'th' ? 'ต้องการความช่วยเหลือ?' : 'Need Help?'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {language === 'th' ?'หากคุณมีคำถามหรือต้องการความช่วยเหลือในการกรอกแบบฟอร์ม สามารถติดต่อเราได้' :'If you have questions or need help filling out the form, feel free to contact us'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  iconName="Phone"
                  iconPosition="left"
                >
                  {language === 'th' ? 'โทร 02-XXX-XXXX' : 'Call 02-XXX-XXXX'}
                </Button>
                <Button
                  variant="outline"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  {language === 'th' ? 'แชทออนไลน์' : 'Live Chat'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingForm;