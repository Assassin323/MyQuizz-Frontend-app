// ViewFileDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewFileDetails = () => {
  const { filename } = useParams();
  const [fileDetails, setFileDetails] = useState(null);

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        console.log(`Fetching details for file: ${filename}`);
        const response = await fetch(`http://localhost:3002/files/${filename}`);
        const data = await response.json();    
        if (response.status === 200) {
          setFileDetails(data);
        } else {
          console.error('Error fetching HTML content:', data.message);
        }
      } catch (error) {
        console.error('Error fetching file details:', error);
      }
    };
    fetchFileDetails();
  }, [filename]);

  const replaceImagePaths = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.getElementsByTagName('img');
    for (const img of images) {
      const src = img.getAttribute('src');
      img.setAttribute('src', `http://localhost:3002${src}`);
    }
    return doc.documentElement.innerHTML;
  };

  if (!fileDetails) {
    console.log('File details not loaded yet');
    return <div>Loading...</div>;
  }

  const contentWithReplacedPaths = replaceImagePaths(fileDetails.convertedFileContent);
  return (
    <div>
      <h2>{fileDetails.fileName}</h2>
      <div dangerouslySetInnerHTML={{ __html: contentWithReplacedPaths }} />
    </div>
  );
};

export default ViewFileDetails;
