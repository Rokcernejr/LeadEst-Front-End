import React from 'react';
import { FileUpload } from './components/FileUpload';
import { FileText } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FileText className="w-16 h-16 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4">LeadEst</h1>
            <p className="text-beige-200 text-lg">
              Upload your Excel file containing material names and lead times
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
            <FileUpload />
          </div>

          <div className="mt-8 text-center text-sm text-beige-200/60">
            <p>Supported format: .xlsx files with 2 columns</p>
            <p>Column 1: Material names | Column 2: Lead times</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;