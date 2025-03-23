import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import OtpVerification from './components/OtpVerification';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || 
                    location.pathname === '/signup' || 
                    location.pathname === '/verify-email';

  return (
    <div className="app">
      {/* Navbar - Always visible */}
      <nav className="navbar">
        <Link to="/" className="logo">ASRA</Link>
        <div className="nav-center">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-buttons">
          {!isAuthPage ? (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          ) : (
            <Link to="/" className="home-btn">Home</Link>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<OtpVerification />} />
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <section className="hero">
              <div className="hero-content">
                <h1>Welcome to YourBrand</h1>
                <p>Transform your ideas into reality with our innovative solutions</p>
                <button className="cta-button">Get Started</button>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
              <h2>Our Features</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <h3>Feature 1</h3>
                  <p>Description of your amazing feature goes here.</p>
                </div>
                <div className="feature-card">
                  <h3>Feature 2</h3>
                  <p>Description of your amazing feature goes here.</p>
                </div>
                <div className="feature-card">
                  <h3>Feature 3</h3>
                  <p>Description of your amazing feature goes here.</p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact">
              <h2>Get in Touch</h2>
              <div className="contact-form">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message"></textarea>
                <button className="submit-button">Send Message</button>
              </div>
            </section>

            {/* Footer */}
            <footer>
              <p>&copy; 2024 YourBrand. All rights reserved.</p>
            </footer>
          </>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
