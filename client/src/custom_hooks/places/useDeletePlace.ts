export const usedeletePlaces = async (id: string) => {
    const response = await fetch(`traventure/api/place/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  
    alert(`${id} deleted successfully.`);
  
  };