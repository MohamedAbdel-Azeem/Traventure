import axios from "axios";
import { useState } from "react";
import { ACTUALProduct } from "../../components/data/ProductData";
import {
  uploadFileToStorage,
  deleteFileFromStorage,
} from "../../firebase/firebase_storage";

const useEditProduct = (
  currentProduct: ACTUALProduct,
  body: ACTUALProduct | null,
  newImage: File | null
) => {
  const id = currentProduct._id;
  const oldImageUrl = currentProduct.imageUrl;
  const [isLoading, setIsLoading] = useState(false);
  const [didSucceed, setDidSucceed] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<ACTUALProduct | null>(
    null
  );

  const updateProduct = async () => {
    if (!id || !body) return;
    setIsLoading(true);
    setDidSucceed(null); // Reset success state before starting

    try {
      // Check if there's a new image to upload
      if (newImage) {
        // Upload new image to Firebase Storage and get the URL
        const newImageUrl = await uploadFileToStorage(newImage);

        // Update the body with the new image URL
        body.imageUrl = newImageUrl;
      }

      // Make the API call to update the product
      const response = await axios.patch(
        `/traventure/api/product/update/${id}`,
        body
      );

      // If the update is successful
      if (response && response.status >= 200 && response.status < 300) {
        setUpdatedProduct(response.data); // Store the updated product

        setDidSucceed(true); // Set success state to true
        deleteFileFromStorage(oldImageUrl);

        // If a new image was uploaded, delete the old one
        if (newImage) {
          const oldImageUrl = currentProduct.imageUrl;

          // Delete the old image from Firebase Storage (ignore errors if the file doesn't exist)
          try {
            console.log(oldImageUrl);
            // await deleteFileFromStorage(oldImageUrl);
          } catch (err) {
            if (err.code === "storage/object-not-found") {
              console.warn(
                "Old image not found in Firebase Storage, skipping deletion."
              );
            } else {
              console.error("Error deleting old image:", err);
            }
          }
        }
      } else {
        throw new Error("Failed to update product");
      }
    } catch (err: any) {
      deleteFileFromStorage(body.imageUrl);
      setError(err.message || "Error updating product");
      setDidSucceed(false); // Set success state to false
    } finally {
      setIsLoading(false); // Always reset loading state at the end
    }
  };

  return { updateProduct, isLoading, didSucceed, error, updatedProduct };
};

export default useEditProduct;
