// utils/fetchquiz.js
export const fetchQuizData = async () => {
  try {
    const response = await fetch('/api/fetchquiz'); // API route in the app folder
    if (!response.ok) {
      throw new Error('Failed to fetch quiz data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return [];
  }
};
