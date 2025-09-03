import React from 'react';
import MatchByLevel from './components/MatchByLevel';
import MatchBySkill from './components/MatchBySkill';

const TechnicianMatchingPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 flex flex-col items-center py-10">
    <h1 className="text-3xl font-bold text-purple-900 mb-6">ระบบจับคู่ช่างตามเลเวลและความสามารถ</h1>
    <MatchByLevel />
    <MatchBySkill />
  </div>
);

export default TechnicianMatchingPage;
