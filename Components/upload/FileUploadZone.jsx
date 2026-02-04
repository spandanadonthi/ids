import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Camera } from 'lucide-react';

export default function FileUploadZone({ onFilesAdded }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = React.useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      onFilesAdded(droppedFiles);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      onFilesAdded(selectedFiles);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`p-12 transition-all duration-300 ${
        dragActive ? 'bg-[#A1D6E2]/10' : ''
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="text-center">
        <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          dragActive 
            ? 'bg-[#A1D6E2] scale-110' 
            : 'bg-gradient-to-br from-[#A1D6E2]/20 to-[#1A3E5D]/20'
        }`}>
          <Upload className={`w-10 h-10 transition-colors duration-300 ${
            dragActive ? 'text-white' : 'text-[#1A3E5D]'
          }`} />
        </div>

        <h3 className="text-2xl font-bold text-[#1A3E5D] mb-3">
          {dragActive ? 'Drop files here' : 'Upload Files for Scanning'}
        </h3>
        
        <p className="text-gray-600 mb-8 text-lg">
          Drag and drop your files here, or click to browse
        </p>

        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#1A3E5D] hover:bg-[#A1D6E2] hover:text-[#1A3E5D] transition-all duration-300"
          >
            <FileText className="w-5 h-5 mr-2" />
            Choose Files
          </Button>
        </div>

        <div className="mt-8 p-4 bg-gray-50/50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Supported file types:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['PDF', 'TXT', 'CSV', 'JSON', 'XML', 'PCAP', 'LOG', 'EXE', 'ZIP'].map(type => (
              <span key={type} className="px-2 py-1 bg-white rounded text-xs font-medium text-[#1A3E5D]">
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}