import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import StandardInfo from './components/StandardInfo';

const TechnicianRegistrationPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex flex-col items-center py-10">
    <h1 className="text-3xl font-bold text-green-900 mb-6">รับสมัครช่างและมาตรฐาน</h1>
    <StandardInfo />
    <RegistrationForm />
  </div>
);

export default TechnicianRegistrationPage;
