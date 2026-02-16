
import { ApiResponse } from '../types';

const API_KEY = 'ea4b8038c2mshb8e678296d1284ap1dd64bjsn318e95003411';
const API_HOST = 'download-all-in-one-elite.p.rapidapi.com';
const API_BASE_URL = 'https://download-all-in-one-elite.p.rapidapi.com';

/**
 * Fetches media information for a given social media URL.
 * @param targetUrl The URL of the social media post.
 */
export const fetchMediaData = async (targetUrl: string): Promise<ApiResponse> => {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST
    }
  };

  try {
    // The endpoint name might vary based on the specific version of j2download/manhgdev's API.
    // Based on RapidAPI standard conventions for this provider:
    const queryUrl = `${API_BASE_URL}/?url=${encodeURIComponent(targetUrl)}`;
    
    const response = await fetch(queryUrl, options);
    
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }
    
    const data = await response.json();
    return data as ApiResponse;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};
