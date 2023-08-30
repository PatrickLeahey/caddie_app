import API_BASE_URL from '../config';

const handleAddRound = async (newRound, addRound) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rounds`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRound),
    });

    if (response.ok) {
      const resRound = await response.json();
      console.info('Succesfully added round:', resRound);
      addRound(resRound);
    } else {
      console.error('Error adding round');
    }
  } catch (error) {
    console.error('Error adding round:', error);
  }
};

export default handleAddRound;