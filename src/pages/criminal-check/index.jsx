import React from 'react';
import CriminalCheckForm from './components/CriminalCheckForm';
import TechnicianList from './components/TechnicianList';

const CriminalCheckPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center py-10">
    <h1 className="text-3xl font-bold text-blue-900 mb-6">ตรวจประวัติอาชญากรรมของช่าง</h1>
    <CriminalCheckForm />
    <TechnicianList />
  </div>
);

export default CriminalCheckPage;
