import React from 'react';

const MatchByLevel = () => (
  <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mb-8">
    <h2 className="text-xl font-bold mb-4 text-purple-800">จับคู่ช่างตามเลเวลขององค์กร</h2>
    <select className="w-full border border-gray-300 rounded px-3 py-2 mb-4">
      <option>เลือกเลเวลองค์กร</option>
      <option>ระดับเริ่มต้น</option>
      <option>ระดับกลาง</option>
      <option>ระดับสูง</option>
    </select>
    <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">ค้นหาช่างที่ตรงกับเลเวล</button>
  </div>
);

export default MatchByLevel;
