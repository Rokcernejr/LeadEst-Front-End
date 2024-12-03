import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { processExcelFile } from '../utils/excelProcessor';
import { sendDataToApi } from '../services/api';

export const FileUpload: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx')) {
      setError('Please upload only .xlsx files');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const processedData = await processExcelFile(file);
      await sendDataToApi(processedData);
      setSuccess('File processed successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <label 
        className={`
          relative flex flex-col items-center justify-center w-full h-64
          border-2 border-dashed rounded-lg cursor-pointer
          transition-colors duration-200
          ${isLoading ? 'bg-gray-100 border-gray-300' : 'hover:bg-black/5 border-black/20'}
        `}
      >
        <input
          type="file"
          className="hidden"
          accept=".xlsx"
          onChange={handleFileUpload}
          disabled={isLoading}
        />
        
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isLoading ? (
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          ) : (
            <Upload className="w-12 h-12 text-black mb-2" />
          )}
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">.xlsx files only</p>
        </div>
      </label>

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}
    </div>
  );
};