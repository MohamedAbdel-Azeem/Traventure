import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function MiniImageEditor({
  id,
  selectedImages,
  setSelectedImages,
  OutsideClassName,
  OutsideText,
  className,
}: {
  id?: string;
  setSelectedImages: (files: File[]) => void;
  selectedImages: File[];
  OutsideClassName?: string;
  OutsideText?: string;
  className?: string;
}) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const handleFileAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      setSelectedImages((prevImages) => [...prevImages, ...newFiles]);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      if (editIndex !== null) {
        setSelectedImages((prevImages) =>
          prevImages.map((img, index) =>
            index === editIndex ? newFiles[0] : img
          )
        );
        setEditIndex(null);
      } else {
        setSelectedImages((prevImages) => [...prevImages, ...newFiles]);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleEditImage = (index: number) => {
    setEditIndex(index);
    document.getElementById(`dropzone-file-${index}`)?.click();
  };

  return (
    <div
      id={id}
      className={`flex flex-col items-center justify-center w-full relative`}
    >
      {selectedImages.length > 0 ? (
        selectedImages.map((image, index) => (
          <div
            key={index}
            className={`relative w-full h-64 ${OutsideClassName || ""} mb-4`}
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Selected ${index}`}
              className="object-cover w-full h-full rounded-lg"
            />
            <div className="absolute right-2 left-2 bg-white p-1 rounded-full shadow-md">
              <label
                htmlFor={`dropzone-file-${index}`}
                className="cursor-pointer"
              >
                <EditIcon />
              </label>
              <input
                id={`dropzone-file-${index}`}
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <div className="absolute top-2 left-2 bg-white p-1 rounded-full shadow-md">
              <button
                onClick={() => handleEditImage(index)}
                className="cursor-pointer"
              >
                <EditIcon />
              </button>
              <input
                id={`dropzone-file-${index}`}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <button
              onClick={() => handleDeleteImage(index)}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
            >
              <DeleteIcon />
            </button>
          </div>
        ))
      ) : (
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full h-64 ${className} border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-slate-100 ${
            OutsideClassName || ""
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-violet-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-slate-500">
              <span className="font-semibold">
                {OutsideText ? OutsideText : "Click to upload"}
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}

export default MiniImageEditor;
