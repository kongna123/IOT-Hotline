import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AboutSection = ({ language }) => {
  const content = {
    en: {
      title: "About IoT Hotline",
      subtitle: "Your trusted partner for comprehensive IoT solutions",
      description: `IoT Hotline is Thailand's leading platform connecting customers with certified IoT technicians and premium equipment suppliers. We bridge the gap between complex IoT technology and everyday users through professional services and quality products.\n\nOur mission is to make IoT technology accessible, reliable, and beneficial for everyone - from smart home enthusiasts to enterprise clients.`,
      stats: [
        { number: "10,000+", label: "Happy Customers" },
        { number: "500+", label: "Certified Technicians" },
        { number: "50+", label: "Partner Brands" },
        { number: "24/7", label: "Support Available" }
      ],
      team: {
        title: "Our Expert Team",
        members: [
          {
            name: "Somchai Jaidee",
            role: "Lead IoT Engineer",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            experience: "8+ years"
            
          },
          {
            name: "Niran Techawat",
            role: "Network Specialist",
            image: "https://randomuser.me/api/portraits/men/45.jpg",
            experience: "6+ years"
          },
          {
            name: "Ploy Siriporn",
            role: "Customer Success Manager",
            image: "https://randomuser.me/api/portraits/women/28.jpg",
            experience: "5+ years"
          }
        ]
      },
      values: [
        {
          icon: "Shield",
          title: "Reliability",
          description: "Certified technicians and quality-assured products"
        },
        {
          icon: "Clock",
          title: "24/7 Support",
          description: "Round-the-clock assistance for all your IoT needs"
        },
        {
          icon: "Award",
          title: "Expertise",
          description: "Deep technical knowledge across all IoT domains"
        }
      ]
    },
    th: {
      title: "เกี่ยวกับ IoT ฮอตไลน์",
      subtitle: "พันธมิตรที่เชื่อถือได้สำหรับโซลูชัน IoT ที่ครอบคลุม",
      description: `IoT ฮอตไลน์เป็นแพลตฟอร์มชั้นนำของประเทศไทยที่เชื่อมต่อลูกค้ากับช่างเทคนิค IoT ที่ได้รับการรับรองและผู้จำหน่ายอุปกรณ์พรีเมียม เราเป็นสะพานเชื่อมระหว่างเทคโนโลยี IoT ที่ซับซ้อนกับผู้ใช้ทั่วไปผ่านบริการมืออาชีพและผลิตภัณฑ์คุณภาพ\n\nภารกิจของเราคือทำให้เทคโนโลยี IoT เข้าถึงได้ เชื่อถือได้ และเป็นประโยชน์สำหรับทุกคน - ตั้งแต่ผู้ที่ชื่นชอบสมาร์ทโฮมไปจนถึงลูกค้าองค์กร`,
      stats: [
        { number: "10,000+", label: "ลูกค้าที่พอใจ" },
        { number: "500+", label: "ช่างเทคนิคที่ได้รับการรับรอง" },
        { number: "50+", label: "แบรนด์พันธมิตร" },
        { number: "24/7", label: "การสนับสนุนที่มีอยู่" }
      ],
      team: {
        title: "ทีมผู้เชี่ยวชาญของเรา",
        members: [
          {
            name: "สมชาย ใจดี",
            role: "วิศวกร IoT หัวหน้า",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            experience: "8+ ปี"
          },
          {
            name: "นิรันดร์ เทคะวัฒน์",
            role: "ผู้เชี่ยวชาญด้านเครือข่าย",
            image: "https://randomuser.me/api/portraits/men/45.jpg",
            experience: "6+ ปี"
          },
          {
            name: "พลอย ศิริพร",
            role: "ผู้จัดการความสำเร็จของลูกค้า",
            image: "https://randomuser.me/api/portraits/women/28.jpg",
            experience: "5+ ปี"
          }
        ]
      },
      values: [
        {
          icon: "Shield",
          title: "ความน่าเชื่อถือ",
          description: "ช่างเทคนิคที่ได้รับการรับรองและผลิตภัณฑ์ที่มีการประกันคุณภาพ"
        },
        {
          icon: "Clock",
          title: "การสนับสนุน 24/7",
          description: "ความช่วยเหลือตลอดเวลาสำหรับความต้องการ IoT ทั้งหมดของคุณ"
        },
        {
          icon: "Award",
          title: "ความเชี่ยวชาญ",
          description: "ความรู้ทางเทคนิคที่ลึกซึ้งในทุกโดเมน IoT"
        }
      ]
    }
  };

  const currentContent = content?.[language] || content?.en;

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              {currentContent?.title}
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              {currentContent?.subtitle}
            </p>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              {currentContent?.description?.split('\n\n')?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE32JBlZkWfnOkDZCO78OYj-nxcfIN9DfQPA&s"
              alt="IoT Hotline team working"
              className="w-full h-96 object-cover rounded-2xl card-shadow"
            />
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-xl card-shadow border border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.8%</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'th' ? 'อัตราความพอใจ' : 'Satisfaction Rate'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {currentContent?.stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat?.number}
              </div>
              <div className="text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent?.values?.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon name={value?.icon} size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value?.title}
                </h3>
                <p className="text-muted-foreground">
                  {value?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-12">
            {currentContent?.team?.title}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent?.team?.members?.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative inline-block mb-6">
                  <Image
                    src={member?.image}
                    alt={member?.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-background flex items-center justify-center">
                    <Icon name="Check" size={14} className="text-white" />
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-foreground mb-1">
                  {member?.name}
                </h4>
                <p className="text-muted-foreground mb-2">
                  {member?.role}
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  <Icon name="Award" size={14} className="mr-1" />
                  {member?.experience}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;