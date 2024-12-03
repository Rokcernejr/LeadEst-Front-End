import { read, utils } from 'xlsx';
import { ProcessedData } from '../types';

export const processExcelFile = async (file: File): Promise<ProcessedData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(firstSheet, { header: 1 }) as [string, number][];

        if (jsonData.some(row => row.length !== 2)) {
          throw new Error('Excel file must contain exactly 2 columns');
        }

        const processedData: ProcessedData[] = jsonData.map(([material, leadTime]) => ({
          Material_Name: material,
          Lead_Time: Number(leadTime)
        }));

        resolve(processedData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsArrayBuffer(file);
  });
};