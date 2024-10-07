import { useState } from 'react';

export const useDeletePlaces = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const deletePlace = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/traventure/api/place/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete place');
      }

      alert(`${id} deleted successfully.`);
      setError(null);
    } catch (error) {
      console.error("Error deleting place:", error);
      setError(error.message);
    }
    
    setLoading(false);
  };

  return { deletePlace, error, loading };
};