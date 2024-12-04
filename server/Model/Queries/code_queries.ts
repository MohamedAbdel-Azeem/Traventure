import Code from "../Schemas/Code";

export const useCode = async (email: string, code: string) => {
  try {
    const userCode = await Code.findOne({
      email,
      code,
    });
    if (userCode) {
      await Code.deleteOne({
        email,
        code,
      });
      return true;
    }
    return false;
  } catch (err) {
    console.error("Error finding code:", err);
    throw new Error("Failed to find code");
  }
};

export const addCode = async (email: string, code: string) => {
  try {
    const addedCode = await Code.create({ email, code });
    return addedCode;
  } catch (err) {
    console.error("Error adding code:", err);
    throw new Error("Failed to add code");
  }
};

module.exports = { useCode, addCode };
