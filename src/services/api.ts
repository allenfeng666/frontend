import axios from 'axios';

const API_URL = 'http://localhost:3000/summarize_url';

export const makeApiRequest = async (
  url: string,
  length: number,
  language: string
) => {
  try {
    console.log(url + ' ' + length + ' ' + language);
    const response = await axios.post(API_URL, {
      url,
      length,
      language,
    });
    console.log(response.data);
    return response.data.summaries.extractedData;
  } catch (error) {
    throw new Error('Failed to fetch the summary. Please try again.');
  }
};
