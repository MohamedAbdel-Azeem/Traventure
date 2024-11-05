import React from "react";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebase";

interface PDFSolutionProps {
  pdftoview: string;
}

const PDFSolution: React.FC<PDFSolutionProps> = ({ pdftoview }) => {
  const targetRef = React.createRef();
  const [isLoading, setIsLoading] = useState(true);
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    disableBodyScroll(targetRef);

    getDownloadURL(ref(storage, pdftoview))
      .then((url) => {
        setPdf(url);
        setInterval(() => setIsLoading(false), 500);
      })
      .catch(() => setIsLoading(false));

    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  return (
    <Box
      ref={targetRef}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      {isLoading ? (
        <></>
      ) : !pdf ? (
        <Typography variant="h4">Oops, something went wrong</Typography>
      ) : (
        <embed type="application/pdf" width="100%" height="100%" src={pdf} />
      )}
    </Box>
  );
};
export default PDFSolution;
