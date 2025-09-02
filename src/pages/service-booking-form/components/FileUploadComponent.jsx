import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadComponent = ({ files, onFilesChange, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mov', 'video/avi'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const maxFiles = 5;

  const validateFile = (file) => {
    if (!allowedTypes?.includes(file?.type)) {
      return 'ประเภทไฟล์ไม่ถูกต้อง กรุณาอัปโหลดรูปภาพหรือวิดีโอเท่านั้น';
    }
    if (file?.size > maxFileSize) {
      return 'ขนาดไฟล์ใหญ่เกินไป (สูงสุด 10MB)';
    }
    return null;
  };

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles);
    const validFiles = [];
    const errors = [];

    if (files?.length + fileArray?.length > maxFiles) {
      errors?.push(`สามารถอัปโหลดได้สูงสุด ${maxFiles} ไฟล์`);
      return;
    }

    fileArray?.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors?.push(`${file?.name}: ${error}`);
      } else {
        validFiles?.push({
          file,
          id: Date.now() + Math.random(),
          name: file?.name,
          size: file?.size,
          type: file?.type,
          preview: file?.type?.startsWith('image/') ? URL.createObjectURL(file) : null
        });
      }
    });

    if (errors?.length > 0) {
      alert(errors?.join('\n'));
    }

    if (validFiles?.length > 0) {
      onFilesChange([...files, ...validFiles]);
    }
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const removeFile = (fileId) => {
    const updatedFiles = files?.filter(f => f?.id !== fileId);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-card rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        แนบไฟล์ภาพหรือวิดีโอ (ไม่บังคับ)
      </h3>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center smooth-transition ${
          dragActive 
            ? 'border-primary bg-primary/5' 
            : error 
            ? 'border-error bg-error/5' :'border-border hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-muted-foreground" />
            </div>
          </div>
          
          <div>
            <p className="text-foreground font-medium mb-2">
              ลากและวางไฟล์ที่นี่ หรือ
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef?.current?.click()}
              iconName="FolderOpen"
              iconPosition="left"
            >
              เลือกไฟล์
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            รองรับไฟล์: JPG, PNG, GIF, MP4, MOV, AVI<br />
            ขนาดสูงสุด: 10MB ต่อไฟล์ | สูงสุด {maxFiles} ไฟล์
          </p>
        </div>
      </div>
      {error && (
        <p className="text-error text-sm mt-2">{error}</p>
      )}
      {files?.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="font-medium text-foreground">ไฟล์ที่แนบ ({files?.length})</h4>
          {files?.map((fileObj) => (
            <div key={fileObj?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                {fileObj?.preview ? (
                  <img 
                    src={fileObj?.preview} 
                    alt={fileObj?.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center">
                    <Icon name="FileVideo" size={20} className="text-secondary-foreground" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                    {fileObj?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(fileObj?.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(fileObj?.id)}
                iconName="X"
                className="text-muted-foreground hover:text-error"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;