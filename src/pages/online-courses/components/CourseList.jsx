import React from 'react';
import CourseDetail from './CourseDetail';

const courses = [
  { 
    id: 1, 
    title: 'อบรมอุปกรณ์ใช้งาน', 
    desc: 'เรียนรู้การใช้งานอุปกรณ์ Syslink', 
    // เปลี่ยนจาก bg-yellow-200 เป็น bg-blue-50 หรือ bg-white
    color: 'bg-blue-50', 
    youtubeUrl: 'https://www.youtube.com/watch?v=OjPmFiszD6Q' 
  },
  { 
    id: 2, 
    title: 'อบรมขั้นตอนการ Config', 
    desc: 'การติดตั้งและ Smart Home', 
    // เปลี่ยนจาก bg-yellow-300 เป็น bg-white หรือ bg-blue-50
    color: 'bg-white', 
    youtubeUrl: 'https://www.youtube.com/watch?v=p5DoQ40Jpqg' 
  },
  // เพิ่มคอร์สอื่นๆ ได้ตามต้องการ
];

const CourseList = () => (
  // อาจจะเพิ่มสีพื้นหลังให้ div หลักด้วย เช่น bg-gray-100 เพื่อให้ดูมีมิติ
  <div className="flex flex-col gap-6 w-full max-w-5xl p-4 sm:p-6 bg-gray-100 rounded-lg shadow-inner">
    {courses.map(course => (
      <CourseDetail key={course.id} {...course} />
    ))}
  </div>
);

export default CourseList;