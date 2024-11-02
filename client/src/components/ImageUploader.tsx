import React from "react";
import EditIcon from "@mui/icons-material/Edit";

function ImageUploader({
  selectedImage,
  setSelectedImage,
}: {
  setSelectedImage: (file: File) => void;
  selectedImage: File | null;
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.startsWith("image/")) {
        setSelectedImage(file);
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full relative">
      {selectedImage ? (
        <div className="relative w-full h-64">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="object-cover w-full h-full rounded-lg"
          />
          <div className="absolute top-2 left-2 bg-white p-1 rounded-full shadow-md">
            <label htmlFor="dropzone-file" className="cursor-pointer">
              <EditIcon />
            </label>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-slate-100"
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
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}

export default ImageUploader;
