'use client'
import React, { useState } from 'react'

const FileUploadPage = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file) return;
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('File uploaded successfully');
          // Handle success (e.g., show a success message)
        } else {
          console.error('File upload failed');
          // Handle error (e.g., show an error message)
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error (e.g., show an error message)
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!file}>
          Upload
        </button>
      </form>
    );
}

export default FileUploadPage