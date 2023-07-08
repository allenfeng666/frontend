import axios from 'axios';

const API_URL = 'YOUR_API_ENDPOINT_URL';

export const makeApiRequest = async (
  url: string,
  length: number,
  language: string
) => {
  try {
    const response = await axios.post(API_URL, {
      url,
      length,
      language,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch the summary. Please try again.');
  }
};
