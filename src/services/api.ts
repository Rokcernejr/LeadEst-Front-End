import axios from 'axios';
import { ProcessedData, ApiResponse } from '../types';

const API_URL = 'http://localhost:5000/train';

export const sendDataToApi = async (data: ProcessedData[]): Promise<ApiResponse> => {
  try {
    const response = await axios.post(API_URL, { data }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return { success: true, message: 'Data processed successfully' };
  } catch (error) {
    throw new Error('Failed to process data');
  }
};
