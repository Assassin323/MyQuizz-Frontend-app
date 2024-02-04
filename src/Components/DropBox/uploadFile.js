// uploadFile.js
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, CardActions, CardContent, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ViewFile from "../ViewFile/ViewFile";
import "./uploadFile.css";
import axios from "axios";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [viewFile, setViewFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setErrorMessage(null);
  }, []);

  const removeFile = () => {
    setFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: Boolean(file),
  });
  const goBack = () => {
    setViewFile(false);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
          setErrorMessage('Please select a file to upload.');
          return;
      }
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post('http://localhost:3002/uploadFile', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      if (response.status === 200) {
          // const fileId = response.data.fileId;
          navigate(`/viewFile`);
      } else {
          setErrorMessage('File upload failed. Please try again.');
      }
  } catch (err) {
      console.error('File upload failed', err);
      setErrorMessage('File upload failed. Please try again.');
  }
  };

  return (
    <React.Fragment>
      <CardContent component="div" className="card">
        {!viewFile ? (
          <React.Fragment>
            <Typography className="card-typo" variant="h3" gutterBottom>
              Upload or Drag and Drop Files
            </Typography>
            {!file ? (
              <CardContent
                component="div"
                className={`drop-area ${isDragActive ? "drag-active" : ""}`}
                {...getRootProps()}
              >
                <input {...getInputProps()} accept=".doc, .docx" type="file" />
                <label htmlFor="upload-file">
                  <Typography sx={{ fontSize: 20 }} variant="p" gutterBottom>
                    {isDragActive
                      ? "Drop the files here ..."
                      : "Drag and drop a file here or click + to select"}
                  </Typography>
                  <br />
                  <AddIcon
                    fontSize="large"
                    className="Add-icon"
                    color="primary"
                  />
                </label>
              </CardContent>
            ) : (
              <section>
                <div className="flex gap-4 align-center">
                  <AttachFileIcon fontSize="small" color="primary" />
                  <Typography className="file-name" variant="p">
                    {file.name}
                  </Typography>
                  <Button
                    className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                    onClick={removeFile}
                    startIcon={<CloseIcon />}
                  ></Button>
                </div>
              </section>
            )}
            {errorMessage && (
              <Typography
                variant="subtitle1"
                className="error-message"
                color="error"
                gutterBottom
              >
                {errorMessage}
              </Typography>
            )}
            <CardActions>
              <Button
                className="upload-button"
                color="secondary"
                variant="contained"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </CardActions>
          </React.Fragment>
        ) : (
          <ViewFile file={file} goBack={goBack} />
        )}
      </CardContent>
    </React.Fragment>
  );
};

export default UploadFile;
