import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import JobCard from './components/JobCard';
import SearchPanel from './components/SearchPanel';
import StatusProgressBar from './components/StatusProgressBar';
import EmptyState from './components/EmptyState';
import LoadingSpinner from './components/LoadingSpinner';

const JobTrackingDashboard = () => {
  const [language, setLanguage] = useState('en');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ status: 'all' });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);

  // Mock job data
  const mockJobs = [
    {
      id: 'JOB001',
      category: language === 'th' ? 'Smart Sensor' : 'Smart Sensor',
      status: 'in-progress',
      progress: 75,
      location: language === 'th' ? 'กรุงเทพมหานคร, ประเทศไทย' : 'Bangkok, Thailand',
      createdAt: '2025-01-28T10:00:00Z',
      estimatedCompletion: '2025-01-30T16:00:00Z',
      description: language === 'th' 
        ? `เซ็นเซอร์อุณหภูมิไม่ทำงาน ไม่สามารถเชื่อมต่อกับแอปได้\nอุปกรณ์แสดงไฟแดงตลอดเวลา และไม่ตอบสนองต่อการกดปุ่ม reset\nต้องการให้ช่างมาตรวจสอบและซ่อมแซม`
        : `Temperature sensor not working, cannot connect to app.\nDevice shows red light constantly and doesn't respond to reset button.\nNeed technician to inspect and repair.`,
      technician: {
        name: language === 'th' ? 'สมชาย วงศ์ใหญ่' : 'Somchai Wongyai',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',phone: '+66-89-123-4567',
        rating: 4.8
      },
      attachments: [
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop', type: 'image' },
        { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop', type: 'image' }
      ],
      statusHistory: [
        { status: 'pending', timestamp: '2025-01-28T10:00:00Z' },
        { status: 'accepted', timestamp: '2025-01-28T11:30:00Z' },
        { status: 'in-progress', timestamp: '2025-01-28T14:00:00Z' }
      ],
      notes: language === 'th' ? 'ช่างได้ตรวจสอบแล้ว พบว่าเป็นปัญหาที่เซ็นเซอร์ กำลังสั่งอะไหล่ใหม่': 'Technician has inspected, found sensor issue. Ordering replacement parts.'
    },
    {
      id: 'JOB002',
      category: language === 'th' ? 'Smart Switch' : 'Smart Switch',status: 'completed',
      progress: 100,
      location: language === 'th' ? 'เชียงใหม่, ประเทศไทย' : 'Chiang Mai, Thailand',createdAt: '2025-01-25T09:00:00Z',estimatedCompletion: '2025-01-27T17:00:00Z',
      description: language === 'th' 
        ? `สวิตช์อัจฉริยะไม่สามารถควบคุมผ่าน WiFi ได้\nการเชื่อมต่อขาดหายบ่อย และไม่สามารถตั้งเวลาได้\nต้องการให้ช่างมาติดตั้งใหม่`
        : `Smart switch cannot be controlled via WiFi.\nConnection drops frequently and timer function not working.\nNeed technician to reinstall.`,
      technician: {
        name: language === 'th' ? 'นิรันดร์ ช่างไฟ' : 'Niran Changfai',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',phone: '+66-85-987-6543',
        rating: 4.9
      },
      attachments: [
        { url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop', type: 'image' }
      ],
      statusHistory: [
        { status: 'pending', timestamp: '2025-01-25T09:00:00Z' },
        { status: 'accepted', timestamp: '2025-01-25T10:15:00Z' },
        { status: 'in-progress', timestamp: '2025-01-25T13:00:00Z' },
        { status: 'completed', timestamp: '2025-01-27T16:30:00Z' }
      ],
      notes: language === 'th' ? 'งานเสร็จสิ้นแล้ว สวิตช์ทำงานปกติ ลูกค้าพอใจ': 'Job completed successfully. Switch working normally. Customer satisfied.'
    },
    {
      id: 'JOB003',
      category: language === 'th' ? 'Gateway & Hub' : 'Gateway & Hub',status: 'pending',
      progress: 0,
      location: language === 'th' ? 'ภูเก็ต, ประเทศไทย' : 'Phuket, Thailand',createdAt: '2025-01-29T14:30:00Z',estimatedCompletion: '2025-02-02T12:00:00Z',
      description: language === 'th' 
        ? `Gateway ไม่สามารถเชื่อมต่ออุปกรณ์ IoT ได้\nไฟสถานะกะพริบสีแดง และไม่มีสัญญาณ WiFi\nต้องการให้ช่างมาตรวจสอบระบบเครือข่าย`
        : `Gateway cannot connect to IoT devices.\nStatus light blinking red and no WiFi signal.\nNeed technician to check network system.`,
      technician: null,
      attachments: [
        { url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=200&fit=crop', type: 'image' },
        { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop', type: 'image' }
      ],
      statusHistory: [
        { status: 'pending', timestamp: '2025-01-29T14:30:00Z' }
      ],
      notes: null
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    
    // Simulate loading
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 1500);
  }, [language]);

  const handleSearch = (query, searchType) => {
    setSearchQuery(query);
    filterJobs(query, searchType, filters);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    filterJobs(searchQuery, 'jobId', newFilters);
  };

  const filterJobs = (query, searchType, currentFilters) => {
    let filtered = [...jobs];

    // Apply search filter
    if (query?.trim()) {
      filtered = filtered?.filter(job => {
        if (searchType === 'jobId') {
          return job?.id?.toLowerCase()?.includes(query?.toLowerCase());
        } else if (searchType === 'phone') {
          return job?.technician?.phone?.includes(query) || false;
        }
        return true;
      });
    }

    // Apply status filter
    if (currentFilters?.status !== 'all') {
      filtered = filtered?.filter(job => job?.status === currentFilters?.status);
    }

    setFilteredJobs(filtered);
  };

  const handleContactTechnician = (technician) => {
    setSelectedTechnician(technician);
    setShowContactModal(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 1000);
  };

  const getActiveJobsCount = () => {
    return jobs?.filter(job => job?.status === 'in-progress' || job?.status === 'accepted')?.length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          activeJobsCount={getActiveJobsCount()} 
          isAuthenticated={true}
        />
        <main className="pt-16">
          <LoadingSpinner 
            message={language === 'th' ? 'กำลังโหลดข้อมูลงาน...' : 'Loading job data...'}
            language={language}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeJobsCount={getActiveJobsCount()} 
        isAuthenticated={true}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Activity" size={28} className="text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                {language === 'th' ? 'ติดตามงาน' : 'Job Tracking Dashboard'}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {language === 'th' ?'ติดตามสถานะงานบริการ IoT ของคุณแบบเรียลไทม์' :'Track your IoT service requests in real-time'
              }
            </p>
          </div>

          {/* Search Panel */}
          <SearchPanel
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            language={language}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 card-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'th' ? 'งานทั้งหมด' : 'Total Jobs'}
                  </p>
                  <p className="text-2xl font-bold text-foreground">{jobs?.length}</p>
                </div>
                <Icon name="Briefcase" size={24} className="text-primary" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 card-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'th' ? 'กำลังดำเนินการ' : 'In Progress'}
                  </p>
                  <p className="text-2xl font-bold text-accent">
                    {jobs?.filter(job => job?.status === 'in-progress')?.length}
                  </p>
                </div>
                <Icon name="Clock" size={24} className="text-accent" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 card-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'th' ? 'เสร็จสิ้น' : 'Completed'}
                  </p>
                  <p className="text-2xl font-bold text-success">
                    {jobs?.filter(job => job?.status === 'completed')?.length}
                  </p>
                </div>
                <Icon name="CheckCircle" size={24} className="text-success" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 card-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'th' ? 'รอดำเนินการ' : 'Pending'}
                  </p>
                  <p className="text-2xl font-bold text-warning">
                    {jobs?.filter(job => job?.status === 'pending')?.length}
                  </p>
                </div>
                <Icon name="AlertCircle" size={24} className="text-warning" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Jobs List */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  {language === 'th' ? 'รายการงาน' : 'Job List'}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({filteredJobs?.length})
                  </span>
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  {language === 'th' ? 'รีเฟรช' : 'Refresh'}
                </Button>
              </div>

              {filteredJobs?.length === 0 ? (
                <EmptyState
                  type={searchQuery ? 'no-search-results' : 'no-jobs'}
                  onRetry={handleRefresh}
                  language={language}
                />
              ) : (
                <div className="space-y-6">
                  {filteredJobs?.map((job) => (
                    <JobCard
                      key={job?.id}
                      job={job}
                      onContactTechnician={handleContactTechnician}
                      language={language}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Progress for First Job */}
              {filteredJobs?.length > 0 && (
                <StatusProgressBar
                  currentStatus={filteredJobs?.[0]?.status}
                  language={language}
                />
              )}

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6 card-shadow">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {language === 'th' ? 'การดำเนินการด่วน' : 'Quick Actions'}
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => window.location.href = '/service-booking-form'}
                  >
                    {language === 'th' ? 'จองบริการใหม่' : 'Book New Service'}
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    {language === 'th' ? 'ติดต่อสนับสนุน' : 'Contact Support'}
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="FileText"
                    iconPosition="left"
                  >
                    {language === 'th' ? 'ดาวน์โหลดรายงาน' : 'Download Report'}
                  </Button>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-card border border-border rounded-lg p-6 card-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="HelpCircle" size={20} className="text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    {language === 'th' ? 'ต้องการความช่วยเหลือ?' : 'Need Help?'}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'th' ?'ทีมสนับสนุนของเราพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมง' :'Our support team is available 24/7 to assist you'
                  }
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">+66-2-123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">support@iothotline.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">
                      {language === 'th' ? 'แชทสด' : 'Live Chat'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Contact Technician Modal */}
      {showContactModal && selectedTechnician && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {language === 'th' ? 'ติดต่อช่างเทคนิค' : 'Contact Technician'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContactModal(false)}
                iconName="X"
              />
            </div>
            
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={selectedTechnician?.avatar}
                  alt={selectedTechnician?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-1">
                {selectedTechnician?.name}
              </h4>
              <p className="text-muted-foreground mb-2">
                {language === 'th' ? 'ช่างเทคนิค IoT' : 'IoT Technician'}
              </p>
              <div className="flex items-center justify-center gap-1">
                <Icon name="Star" size={16} className="text-warning fill-current" />
                <span className="text-sm font-medium">{selectedTechnician?.rating}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="default"
                fullWidth
                iconName="Phone"
                iconPosition="left"
                onClick={() => window.open(`tel:${selectedTechnician?.phone}`)}
              >
                {language === 'th' ? 'โทรหา' : 'Call'} {selectedTechnician?.phone}
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="MessageCircle"
                iconPosition="left"
              >
                {language === 'th' ? 'ส่งข้อความ' : 'Send Message'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTrackingDashboard;