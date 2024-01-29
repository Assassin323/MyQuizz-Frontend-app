/* ViewFile.js */
import React, { useState, useEffect } from "react";
import { Button, Typography, Card, CardContent } from "@mui/material";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { useNavigate } from "react-router-dom";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewFile.css";

const ViewFile = () => {
  const navigate = useNavigate();
  const [existingFiles, setExistingFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setExistingFiles(storedFiles);
    setErrorMessage(false);
  }, []); // Load files from local storage on initial render

  const handleViewFile = (selectedFile) => {
    navigate(`/viewFile/${selectedFile.path}`);
  };

  const handleRemoveFile = (removedFile) => {
    const updatedFiles = existingFiles.filter(
      (file) => file.path !== removedFile.path
    );
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
    setExistingFiles(updatedFiles); // Update state to trigger re-render
  };

  const handleFileHover = (filename) => {
    toast.info(filename, {
      position: "top-center",
      autoClose: 100,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      toastId: "fileToast", // Specify a unique toastId to limit to one toast at a time
      className: "custom-toast"
    });
  };

  return (
    <div className="view-file-container">
      <ToastContainer />
      {existingFiles.length === 0 && (
        <Typography variant="h5" color="error" gutterBottom>
          {errorMessage || "No uploaded files. Please upload files."}
        </Typography>
      )}

      {existingFiles.length > 0 && (
        <div className="cards-container">
          {existingFiles.map((uploadedFile, index) => (
            <Card
              key={`${uploadedFile.path}-${index}`}
              className="file-card"
              onMouseEnter={() => handleFileHover(uploadedFile.path)}
            >
              <CardContent className="file-content">
                <FilePresentIcon fontSize="small" />
                <Typography>{uploadedFile.path}</Typography>
                <Button
                  onClick={() => handleViewFile(uploadedFile)}
                  color="primary"
                  variant="text"
                  className="view-file-button"
                  type="button"
                >
                  View
                </Button>
                <Button>
                  <DeleteForeverRoundedIcon
                    onClick={() => handleRemoveFile(uploadedFile)}
                    color="error"
                    variant="contained"
                    className="remove-file-button"
                    type="button"
                  />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Button
        onClick={() => navigate("/upload")}
        color="secondary"
        variant="contained"
        className="back-button"
        type="button"
      >
        Go Back
      </Button>
    </div>
  );
};

export default ViewFile;
