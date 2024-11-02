import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

function PDFUploader({
  selectedPDF,
  setSelectedPDF,
  OutsideClassName
}: {
  setSelectedPDF: (file: File) => void;
  selectedPDF: File | null;
  OutsideClassName?: string;
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.includes("application/pdf")) {
        setSelectedPDF(file);
      }
    }
  };

  return (
    <div className={`flex items-center justify-center w-full relative ${OutsideClassName || ''}`}>
      {selectedPDF ? (
        <div className="relative w-full max-w-md h-64 border-4 border-violet-500 rounded-lg overflow-hidden shadow-lg">
          <div className="flex flex-col items-center justify-center h-full bg-slate-50 transition-all ease-in-out duration-300">
            <PictureAsPdfIcon className="text-violet-500 mb-2" />
            <p className="text-sm font-medium text-slate-700 truncate">{selectedPDF.name}</p>
          </div>
          <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200">
            <label htmlFor="dropzone-file" className="cursor-pointer">
              <EditIcon className="text-violet-500 hover:text-violet-600" />
            </label>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full max-w-md h-64 border-4 border-dashed border-violet-500 rounded-lg cursor-pointer bg-white hover:bg-slate-100 transition-colors duration-200 ${OutsideClassName || ''}`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-4 text-violet-500"
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
            <p className="mb-2 text-sm font-semibold text-slate-700">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-500">Only PDF files are allowed</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}

export default PDFUploader;