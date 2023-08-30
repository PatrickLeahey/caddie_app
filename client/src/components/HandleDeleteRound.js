import API_BASE_URL from '../config';

const handleDeleteRound = async (deleteId, deleteRoundById) => {
  try {
    const id = parseInt(deleteId);
    if (isNaN(id)) {
      console.error('Invalid ID:', id);
      return;
    }
    const response = await fetch(`${API_BASE_URL}/api/rounds/${id}`, { method: 'DELETE' });

    if (response.ok) {
      console.info('Successfully deleted round');
      deleteRoundById(id);
    } else {
      console.error('Error deleting round');
    }
  } catch (error) {
    console.error('Error deleting round:', error);
  }
};



export default handleDeleteRound;