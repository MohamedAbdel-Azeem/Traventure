
export const deleteUsers = async (username: string, tname: string) => {
  const whattodelete = tname.includes("Advertiser")?"advertiser":tname.includes("Seller")?"seller":"tourGuide"
  const response = await fetch(`/traventure/api/admin/delete/user/${username}/${whattodelete}`, {
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