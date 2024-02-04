// ViewFileDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewFileDetails = () => {
  const { filename } = useParams();
  const [fileDetails, setFileDetails] = useState(null);

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3002/files/${filename}`);
        const data = await response.json();
        if (response.status === 200) {
          setFileDetails(data);
        } else {
          console.log('Error fetching HTML content:', data.message);
        }
      } catch (error) {
        console.error('Error fetching file details:', error);
      }
    };

    fetchFileDetails();
  }, [filename]);

  if (!fileDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Display file details */}
      {/* <h2>{fileDetails.fileName}</h2> */}
      <div dangerouslySetInnerHTML={{ __html: fileDetails.fileContent }} />
    </div>
  );
};

export default ViewFileDetails;
