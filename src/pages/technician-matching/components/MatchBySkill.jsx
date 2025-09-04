import React from 'react';

const MatchBySkill = () => (
  <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mb-8">
    <h2 className="text-xl font-bold mb-4 text-purple-800">จับคู่ช่างตาม Certificate และ Skill</h2>
    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 mb-4" placeholder="กรอกชื่อ Certificate หรือ Skill" />
    <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">ค้นหาช่างที่ตรงกับความสามารถ</button>
  </div>
);

export default MatchBySkill;
