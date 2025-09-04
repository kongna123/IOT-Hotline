import React from 'react';
import CourseList from './components/CourseList';

const OnlineCoursesPage = () => (
  // เปลี่ยนสีพื้นหลังจากโทนเหลือง เป็นสีขาว-เทาที่ดูสะอาดตาขึ้น
  <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
    {/* เปลี่ยนสีตัวอักษรของหัวข้อจากเหลือง เป็นน้ำเงินเข้ม */}
    <h1 className="text-4xl font-extrabold text-blue-900 mb-8">
      คอร์สออนไลน์อบรมช่าง
    </h1>
    <CourseList />
  </div>
);

export default OnlineCoursesPage;