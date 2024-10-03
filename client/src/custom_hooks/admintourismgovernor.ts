export const deleteUsers = async (username: string, tname: string) => {
  const whattodelete = tname.includes("TourismGovernor")?"TourismGovernor":"admin"
  const response = await fetch(`traventure/api/admin/delete/user/${username}/${whattodelete}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }

  alert(`${username} deleted successfully.`);

};