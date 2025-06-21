import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Download,
  Maximize2,
} from "lucide-react";

const ItemModal = ({ item, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      if (isImageFullscreen) {
        setIsImageFullscreen(false);
      } else {
        onClose();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (isImageFullscreen) {
        setIsImageFullscreen(false);
      } else {
        onClose();
      }
    } else if (e.key === "ArrowLeft") {
      prevImage();
    } else if (e.key === "ArrowRight") {
      nextImage();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isImageFullscreen]);

  return (
    <>
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title">
              <h2>{item.name}</h2>
              <span className="modal-type">{item.type}</span>
            </div>
            <div className="modal-actions">
              <button className="action-btn" title="Add to favorites">
                <Heart size={20} />
              </button>
              <button className="action-btn" title="Share">
                <Share2 size={20} />
              </button>
              <button className="action-btn" title="Download">
                <Download size={20} />
              </button>
              <button className="close-btn" onClick={onClose}>
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="modal-content">
            <div className="modal-gallery">
              <div className="main-image-container">
                <img
                  src={item.images[currentImageIndex]}
                  alt={`${item.name} - Image ${currentImageIndex + 1}`}
                  className="main-image"
                  onClick={() => setIsImageFullscreen(true)}
                />

                <button
                  className="fullscreen-btn"
                  onClick={() => setIsImageFullscreen(true)}
                  title="View fullscreen"
                >
                  <Maximize2 size={20} />
                </button>

                {item.images.length > 1 && (
                  <>
                    <button className="nav-btn prev-btn" onClick={prevImage}>
                      <ChevronLeft size={24} />
                    </button>
                    <button className="nav-btn next-btn" onClick={nextImage}>
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                <div className="image-counter">
                  {currentImageIndex + 1} / {item.images.length}
                </div>
              </div>

              {item.images.length > 1 && (
                <div className="thumbnail-strip">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-details">
              <div className="detail-section">
                <h3>Description</h3>
                <p>{item.description}</p>
              </div>

              <div className="detail-section">
                <h3>Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{item.type}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Images:</span>
                    <span className="detail-value">{item.images.length}</span>
                  </div>
                  {item.createdAt && (
                    <div className="detail-item">
                      <span className="detail-label">Added:</span>
                      <span className="detail-value">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="enquiry-section">
                <button
                  className="enquiry-button"
                  // You can replace with a modal or form
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isImageFullscreen && (
        <div className="fullscreen-backdrop" onClick={handleBackdropClick}>
          <div className="fullscreen-container">
            <button
              className="fullscreen-close"
              onClick={() => setIsImageFullscreen(false)}
            >
              <X size={32} />
            </button>

            <img
              src={item.images[currentImageIndex]}
              alt={`${item.name} - Fullscreen`}
              className="fullscreen-image"
            />

            {item.images.length > 1 && (
              <>
                <button className="fullscreen-nav prev" onClick={prevImage}>
                  <ChevronLeft size={32} />
                </button>
                <button className="fullscreen-nav next" onClick={nextImage}>
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className="fullscreen-counter">
              {currentImageIndex + 1} / {item.images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemModal;
