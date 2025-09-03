import React from 'react';

const CriminalCheckForm = () => (
  <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mb-8">
    <label className="block mb-2 text-gray-700 font-semibold">เลขบัตรประชาชนช่าง</label>
    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="กรอกเลขบัตรประชาชน" />
    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">ตรวจสอบประวัติ</button>
  </form>
);

export default CriminalCheckForm;
