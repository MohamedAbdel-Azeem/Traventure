import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid"; // Import UUID

/**
 * Uploads a file to Firebase Storage with a unique name and returns the file URL.
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export const uploadFileToStorage = async (file: File) => {
  if (!file) throw new Error("No file provided");

  // Generate a unique name using UUID
  const uniqueFileName = `${uuidv4()}_${file.name}`;

  const fileRef = ref(storage, `uploads/${uniqueFileName}`); // Save file in 'uploads' folder
  try {
    // Upload the file
    const snapshot = await uploadBytes(fileRef, file);

    // Get the download URL after successful upload
    const downloadUrl = await getDownloadURL(snapshot.ref);
    console.log("File uploaded successfully:", downloadUrl);
    return downloadUrl; // Return the download URL of the uploaded file
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

/**
 * Deletes a file from Firebase Storage given its URL or path.
 * @param {string} fileUrl - The URL or path of the file to delete
 * @returns {Promise<void>}
 */
export const deleteFileFromStorage = async (fileUrl: string) => {
  if (!fileUrl) throw new Error("No file URL provided");

  // If you have the full URL, extract the file path relative to the storage root
  const fileRef = ref(storage, fileUrl);

  try {
    // Delete the file from Firebase Storage
    await deleteObject(fileRef);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};
