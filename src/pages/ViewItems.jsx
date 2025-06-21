import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Plus, Search, Filter, Grid, List, Eye, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import ItemModal from "../components/ItemModal";
import "../Viewitem.css"

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("https://armmbackend.onrender.com/api/items");
        setItems(res.data);
      } catch (err) {
        console.error(err);
        // Show error notification
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
            <span>Failed to load items. Please try again.</span>
          </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Filter and search items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || item.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Get unique types for filter dropdown
  const itemTypes = [...new Set(items.map(item => item.type))];

  if (loading) {
    return (
      <div className="view-items-page">
        <div className="view-items-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your items...</p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="view-items-page">
        <div className="view-items-container">
          <div className="page-header">
            <div className="header-icon">
              <Package size={32} />
            </div>
            <h1>Your Items</h1>
            <p>Manage and view all your items in one place</p>
          </div>

          <div className="empty-state">
            <Package size={64} />
            <h3>No items yet</h3>
            <p>Start building your collection by adding your first item</p>
            <Link to="/add" className="btn-primary">
              <Plus size={20} />
              Add Your First Item
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="view-items-page">
      <div className="view-items-container">
        <div className="page-header">
          <div className="header-content">
            <div className="header-icon">
              <Package size={32} />
            </div>
            <div className="header-text">
              <h1>Your Items</h1>
              <p>{items.length} item{items.length !== 1 ? 's' : ''} in your collection</p>
            </div>
          </div>
          <Link to="/add" className="btn-primary">
            <Plus size={20} />
            Add New Item
          </Link>
        </div>

        <div className="controls-bar">
          <div className="search-filter-group">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-dropdown">
              <Filter size={18} />
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                {itemTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="no-results">
            <Search size={48} />
            <h3>No items found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className={`items-container ${viewMode}`}>
            {filteredItems.map(item => (
              <div key={item._id} className="item-card" onClick={() => setSelected(item)}>
                <div className="item-image-container">
                  <img src={item.images[0]} alt={item.name} className="item-image" />
                  <div className="item-overlay">
                    <button className="overlay-btn">
                      <Eye size={20} />
                    </button>
                    <button className="overlay-btn">
                      <Heart size={20} />
                    </button>
                    <button className="overlay-btn">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="item-content">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <span className="item-type">{item.type}</span>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <div className="item-meta">
                    <span className="image-count">{item.images.length} image{item.images.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default ViewItems;