import React from 'react';

const ProblemDescriptionForm = ({ description, onChange, error }) => {
  const maxLength = 1000;
  const currentLength = description?.length;

  const handleChange = (e) => {
    const value = e?.target?.value;
    if (value?.length <= maxLength) {
      onChange(value);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        อธิบายปัญหาที่พบ
      </h3>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          รายละเอียดปัญหา <span className="text-error">*</span>
        </label>
        <textarea
          value={description}
          onChange={handleChange}
          placeholder="กรุณาอธิบายปัญหาที่พบกับอุปกรณ์ IoT ของคุณ เช่น อุปกรณ์ไม่ทำงาน, เชื่อมต่อไม่ได้, หรือมีปัญหาอื่นๆ"
          className={`w-full min-h-[120px] px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary smooth-transition ${
            error ? 'border-error' : 'border-border'
          }`}
          rows={6}
        />
        
        <div className="flex justify-between items-center text-sm">
          <span className={`${error ? 'text-error' : 'text-muted-foreground'}`}>
            {error || 'อธิบายปัญหาให้ละเอียดเพื่อให้ช่างเทคนิคเข้าใจและเตรียมอุปกรณ์ที่เหมาะสม'}
          </span>
          <span className={`${currentLength > maxLength * 0.9 ? 'text-warning' : 'text-muted-foreground'}`}>
            {currentLength}/{maxLength}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescriptionForm;