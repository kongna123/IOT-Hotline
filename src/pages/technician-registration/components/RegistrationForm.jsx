import React from 'react';

const RegistrationForm = () => (
  <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
    <label className="block mb-2 text-gray-700 font-semibold">ชื่อ-นามสกุล</label>
    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 mb-4" placeholder="กรอกชื่อ-นามสกุล" />
    <label className="block mb-2 text-gray-700 font-semibold">เบอร์โทรศัพท์</label>
    <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 mb-4" placeholder="กรอกเบอร์โทรศัพท์" />
    <label className="block mb-2 text-gray-700 font-semibold">แนบใบรับรอง/Certificate</label>
    <input type="file" className="w-full mb-4" />
    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">สมัครช่าง</button>
  </form>
);

export default RegistrationForm;
