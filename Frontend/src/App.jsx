import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import aiAssistantImage from './assets/images/ai-virtual-assistant.jpg';


function HeroContent() {
  const navigate = useNavigate();

  return (
    <div className="hero-content">
      <h1>Welcome to AVRA</h1>
      <p>An AI-powered research assistant is a virtual tool designed to help people efficiently gather, analyze, and interpret information. It's like having a knowledgeable companion to aid in your academic, professional, or personal research tasks. </p>
      <button className="cta-button" onClick={() => navigate('/dashboard')}>
        Let's Get Started
      </button>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isDashboard = location.pathname === '/dashboard';
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="app">
      {/* Navbar - Always visible */}
      <nav className="navbar">
        <Link to="/" className="logo">AVRA</Link>
        {!isDashboard && !isAuthPage && (
          <div className="nav-center">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        )}
        <div className="nav-buttons">
          {!isAuthPage && !isDashboard ? (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          ) : (
            <Link to="/" className="home-btn">Home</Link>
          )}
        </div>
      </nav>

      {/* User Welcome Message */}
      {user && (
        <div className="user-welcome">
          Welcome, {user.name}!
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <section 
              className="hero"
              style={{
                backgroundImage: `url(${aiAssistantImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <HeroContent />
            </section>

            {/* Features Section */}
            <section id="features" className="features">
              <h2>Our Features</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <h3>Natural Language Processing (NLP)</h3>
                  <p>This allows them to understand and respond to user queries in a conversational manner.</p>
                </div>
                <div className="feature-card">
                  <h3>Personalization</h3>
                  <p>They adapt to individual user needs, offering tailored recommendations and support..</p>
                </div>
                <div className="feature-card">
                  <h3>Semantic Search</h3>
                  <p>Beyond keyword matching, they can understand the meaning of your query, delivering more precise and relevant search results.</p>
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

export default App;