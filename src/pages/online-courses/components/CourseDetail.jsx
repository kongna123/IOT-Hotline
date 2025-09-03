import React from 'react';

const CourseDetail = ({ title, desc, color, youtubeUrl }) => {
  return (
    // เพิ่ม border-t-4 เพื่อให้มีเส้นสีน้ำเงินด้านบน เป็นการเน้นการ์ด
    <div className={`p-6 rounded-lg shadow-md ${color} flex flex-col md:flex-row items-start gap-6 border-t-4 border-blue-500`}>
      {youtubeUrl && (
        <div className="flex-shrink-0 w-full md:w-1/2">
          <div className="relative pt-[56.25%]"> {/* Aspect Ratio Box สำหรับวิดีโอ */}
            <iframe 
              className="absolute top-0 left-0 w-full h-full rounded-md shadow-lg" // เพิ่ม rounded-md และ shadow-lg
              src={youtubeUrl.replace('watch?v=', 'embed/')} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      )}
      <div className="flex-grow w-full md:w-1/2">
        <h3 className="text-2xl font-extrabold text-blue-700 mb-2">{title}</h3> {/* เปลี่ยนเป็น text-blue-700 และ font-extrabold */}
        <p className="text-gray-700 leading-relaxed mb-4">{desc}</p> {/* เปลี่ยนเป็น text-gray-700 และ leading-relaxed */}
        {youtubeUrl && (
          <a 
            href={youtubeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 mt-4"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M19.612 6.784A2.3 2.3 0 0017.91 5.08c-1.28-.35-6.43-.35-6.43-.35s-5.15 0-6.43.35A2.3 2.3 0 00.388 6.784C.038 8.064 0 10 0 10s.038 1.936.388 3.216A2.3 2.3 0 002.09 14.92c1.28.35 6.43.35 6.43.35s5.15 0 6.43-.35a2.3 2.3 0 001.702-1.702c.35-1.28.35-3.216.35-3.216s0-1.936-.35-3.216zM8 12.5v-5l5 2.5-5 2.5z"/>
            </svg>
            ดูวิดีโอเต็ม
          </a>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;