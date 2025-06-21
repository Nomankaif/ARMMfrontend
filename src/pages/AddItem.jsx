import React, { useState } from "react";
import axios from "axios";
import { Upload, Plus, Image, FileText, Tag, AlertCircle, CheckCircle } from "lucide-react";
import "../Additem.css"
import {
  Rocket,
  Shield,
  Zap,
  Users,
  Target,
  Heart,
  ChevronRight,
  Play,
  Mail
} from 'lucide-react';
import { Link } from "react-router-dom";

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    images: [],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFiles = (files) => {
    setFormData({ ...formData, images: files });
    
    // Create preview images
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push({
          id: i,
          name: file.name,
          url: e.target.result
        });
        if (previews.length === files.length) {
          setPreviewImages([...previews]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (indexToRemove) => {
    const newPreviews = previewImages.filter((_, index) => index !== indexToRemove);
    setPreviewImages(newPreviews);
    
    // Update formData.images
    const newFiles = Array.from(formData.images).filter((_, index) => index !== indexToRemove);
    setFormData({ ...formData, images: newFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("description", formData.description);
    
    for (let file of formData.images) {
      data.append("images", file);
    }

    try {
      const res = await axios.post("https://armmbackend.onrender.com/api/items", data);
      
      // Success notification
      const notification = document.createElement('div');
      notification.className = 'success-notification';
      notification.innerHTML = `
        <div class="notification-content">
          <div class="notification-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </div>
          <span>Item successfully added!</span>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
      
      // Clear form
      setFormData({
        name: "",
        type: "",
        description: "",
        images: [],
      });
      setPreviewImages([]);
      document.getElementById('fileInput').value = '';

    } catch (err) {
      console.error(err);
      
      // Error notification
      const notification = document.createElement('div');
      notification.className = 'error-notification';
      notification.innerHTML = `
        <div class="notification-content">
          <div class="notification-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <span>Upload failed. Please try again.</span>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <a href="#home" className="logo">
            <Rocket size={24} />
            Inventory
          </a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/view">View Items</Link></li>
            <li><Link to="/add">Add Item</Link></li>
          </ul>
          
        </div>
      </nav>

    <div className="add-item-page">
      <div className="add-item-container">
        <div className="form-header">
          <div className="header-icon">
            <Plus size={32} />
          </div>
          <h1>Add New Item</h1>
          <p>Fill in the details below to add a new item to your collection</p>
        </div>

        <form onSubmit={handleSubmit} className="add-item-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              <Tag size={18} />
              Item Name
            </label>
            <input 
              type="text" 
              id="name"
              name="name" 
              placeholder="Enter item name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              <FileText size={18} />
              Item Type
            </label>
            <input 
              type="text" 
              id="type"
              name="type" 
              placeholder="Enter item type (e.g., Electronics, Clothing)" 
              value={formData.type} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              <FileText size={18} />
              Description
            </label>
            <textarea 
              id="description"
              name="description" 
              placeholder="Describe your item in detail..." 
              value={formData.description} 
              onChange={handleChange} 
              required 
              className="form-textarea"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Image size={18} />
              Images
            </label>
            
            <div 
              className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                id="fileInput"
                name="images" 
                multiple 
                accept="image/*" 
                onChange={handleFileInput} 
                required 
                className="file-input"
              />
              
              <div className="upload-content">
                <Upload size={48} />
                <h3>Drop images here or click to browse</h3>
                <p>Support for multiple images (JPG, PNG, GIF)</p>
              </div>
            </div>

            {previewImages.length > 0 && (
              <div className="image-previews">
                <h4>Selected Images:</h4>
                <div className="preview-grid">
                  {previewImages.map((image, index) => (
                    <div key={index} className="preview-item">
                      <img src={image.url} alt={image.name} />
                      <button 
                        type="button" 
                        className="remove-image"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </button>
                      <span className="image-name">{image.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Adding Item...
              </>
            ) : (
              <>
                <Plus size={20} />
                Add Item
              </>
            )}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddItem;