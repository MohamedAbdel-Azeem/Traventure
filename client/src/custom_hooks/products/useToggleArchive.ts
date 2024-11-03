import axios from "axios";

export async function ToggleArchive(id: string) {
  try {
    const newProduct = await axios.patch(
      `/traventure/api/product/archive/${id}`
    );
    return newProduct.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
