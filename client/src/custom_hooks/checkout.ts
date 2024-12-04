import axios from "axios";

export const addAddress = async (
  username: string,
  address: object,
) => {
  try {
    const { data } = await axios.patch(
      `/traventure/api/tourist/add/address/${username}`,
      { username, address }
    );
    return data;
  } catch (err) {
    return "Error updating user profile";
  }
};
export const editAddress = async (
  username: string,
  address: object,
  index: number
) => {
  try {
    const { data } = await axios.patch(
      `/traventure/api/tourist/edit/address/${username}`,
      { username, address, index }
    );
    return data;
  } catch (err) {
    return "Error updating user profile";
  }
};

export const deleteAddress = async (
  username: string,
  index: number
) => {
  try {
    const { data } = await axios.patch(
      `/traventure/api/tourist/delete/address/${username}`,
      { username, index }
    );
    return data;
  } catch (err) {
    return "Error updating user profile";
  }
};
