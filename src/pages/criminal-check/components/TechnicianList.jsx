import React from 'react';

const TechnicianList = () => (
  <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-bold mb-4 text-blue-800">รายชื่อช่างที่ผ่านการตรวจสอบ</h2>
    <ul className="divide-y divide-gray-200">
      <li className="py-2 flex justify-between items-center">
        <span>นายสมชาย ใจดี</span>
        <span className="text-green-600 font-semibold">ผ่าน</span>
      </li>
      <li className="py-2 flex justify-between items-center">
        <span>นายประเสริฐ ขยัน</span>
        <span className="text-green-600 font-semibold">ผ่าน</span>
      </li>
    </ul>
  </div>
);

export default TechnicianList;
