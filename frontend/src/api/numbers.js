// src/api/numbers.js
// Service for backend number API

export async function submitNumbers(numbers) {
  try {
    const response = await fetch('http://localhost:3001/numbers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ numbers }),
    });
    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    return { error: 'Failed to submit numbers.' };
  }
}
