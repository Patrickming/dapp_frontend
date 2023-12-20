import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Make sure you have the CSS file for styling

//props
function UploadImage({ address }) {
  //定义title、description、fileInputRef
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); //navigate 路由 可以路由到别的组件

  const handleCancel = () => {
    // Reset the form or specific form fields
    setTitle('');
    setDescription('');
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (fileInputRef.current.files.length === 0) {
      alert('Please select a file to upload.');
      return;
    }
    //返回给后端的数据
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', fileInputRef.current.files[0]);
    formData.append('address', address);

    //发了个请求 post  /upload 指定了一下Content-Type 其实就是后端写的那个表单界面
    try {
      const response = await axios.post('http://127.0.0.1:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle the response from the server here
      console.log('File uploaded successfully', response.data);
      navigate('/success'); //路由到success组件
    } catch (error) {
      // Handle the error here
      console.error('Error uploading file:', error);
    }
  };

  return (
    // 前端展示
    <div className="upload-container">
      <h1>Upload Image to IPFS and Mint NFT</h1>
      <form className="upload-form" onSubmit={handleUpload}>
        <label htmlFor="title">Title *</label>
        <input 
          type="text" 
          id="title" 
          placeholder="Enter image title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          required 
        />

        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          placeholder="Describe your image" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="file">Image *</label>
        <input 
          type="file" 
          id="file" 
          ref={fileInputRef} 
          required 
        />

        <div className="buttons">
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="upload-button">Upload</button>
        </div>
      </form>
    </div>
  );
}

export default UploadImage;
