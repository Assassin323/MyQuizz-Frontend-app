import React, { useState, useEffect } from "react";
import { Button, Typography, Card, CardContent } from "@mui/material";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { useNavigate } from "react-router-dom";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import axios from "axios";
import "./ViewFile.css";

const ViewFile = () => {
  const navigate = useNavigate();
  const [existingFiles, setExistingFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:3002/files");
      setExistingFiles(response.data);
      setErrorMessage(false);
    } catch (error) {
      setErrorMessage("Error fetching files. Please try again later.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleViewFile = (selectedFile) => {
    navigate(`/viewFile/${selectedFile.fileName}`);
  };

  const handleRemoveFile = async (removedFile) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/files/${removedFile.fileName}`
      );
      if (response.status === 200) {
        const updatedFiles = existingFiles.filter(
          (file) => file.fileName !== removedFile.fileName
        );
        setExistingFiles(updatedFiles);
      } else {
        console.error("Failed to remove file");
      }
    } catch (error) {
      console.error("Error removing file", error);
    }
  };

  return (
    <div className="view-file-container">
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
              title={uploadedFile.fileName}
            >
              <CardContent className="file-content">
                <FilePresentIcon fontSize="small" />
                <Typography>{uploadedFile.fileName}</Typography>
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
