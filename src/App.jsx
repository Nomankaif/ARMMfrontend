import React from 'react';
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
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddItem from './pages/AddItem';
import ViewItems from './pages/ViewItems';

function HomePage() {
  return (
    <div className="App">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Launch Your Dreams Into Reality</h1>
            <p>
              Transform your innovative ideas into successful products with our comprehensive 
              platform designed for modern entrepreneurs and creators.
            </p>
            <div className="hero-buttons">
              <a href="#features" className="btn-primary">
                <Play size={20} />
                Explore Features
              </a>
              <a href="#about" className="btn-secondary">
                <ChevronRight size={20} />
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-graphic">
              <Rocket size={120} color="white" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Powerful Features</h2>
            <p>
              Everything you need to bring your vision to life, all in one comprehensive platform
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={30} />
              </div>
              <h3>Lightning Fast</h3>
              <p>
                Experience blazing-fast performance with our optimized infrastructure 
                designed for speed and reliability.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={30} />
              </div>
              <h3>Secure & Safe</h3>
              <p>
                Your data is protected with enterprise-grade security measures 
                and advanced encryption protocols.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={30} />
              </div>
              <h3>Team Collaboration</h3>
              <p>
                Work seamlessly with your team using our advanced collaboration 
                tools and real-time synchronization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-container">
            <div className="about-content">
              <h2>Built for Innovators</h2>
              <p>
                We understand the challenges of turning ideas into reality. That's why we've 
                created a platform that combines powerful tools, intuitive design, and 
                reliable performance to help you succeed.
              </p>
              <p>
                Whether you're a startup founder, creative professional, or established 
                business, our platform adapts to your needs and grows with your ambitions.
              </p>
              <a href="#contact" className="btn-primary">
                <Target size={20} />
                Start Your Journey
              </a>
            </div>
            <div className="about-image">
              <Heart size={120} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of innovators who have transformed their ideas into success stories</p>
          <form className="contact-form">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required 
            />
            <button type="submit">
              <Mail size={20} />
              Get Started
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 LaunchPad. All rights reserved. Built with passion and purpose.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/view" element={<ViewItems />} />
      </Routes>
    </Router>
  );
}

export default App;
