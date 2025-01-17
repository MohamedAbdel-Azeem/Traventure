import axios from "axios";

export const handleDeleteAccount = async (
  user_id: string | undefined,
  username: string,
  type: string,
  wallet: number
) => {
  try {
    const response = await axios.delete(
      "/traventure/api/requestdelete/deleterequestdelete",
      {
        data: {
          user_id: user_id,
          username: username,
          type: type,
          wallet: wallet || 0,
        },
      }
    );

    return "success";
  } catch (error) {
    console.error("Error deleting account:", error);
  }
};
