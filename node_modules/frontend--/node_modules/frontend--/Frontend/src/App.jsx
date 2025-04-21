import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import aiAssistantImage from './assets/images/ai-virtual-assistant.jpg';

function HeroContent() {
  const navigate = useNavigate();
  return (
    <div className="hero-content">
      <h1>Meet <span className="highlight">AVRA</span></h1>
      <p>
        Your AI-powered research ally that redefines how knowledge is discovered, summarized, and utilized.
        From academic pursuits to professional breakthroughs — AVRA is your edge.
      </p>
      <button className="cta-button" onClick={() => navigate('/dashboard')}>
        Get Started Now
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
      <nav className="navbar">
        <Link to="/" className="logo">AVRA</Link>
        {!isDashboard && !isAuthPage && (
          <div className="nav-center">
            <a href="#features">Features</a>
            <a href="#benefits">Benefits</a>
            <a href="#testimonials">Testimonials</a>
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
            <section
              className="hero"
              style={{ backgroundImage: `url(${aiAssistantImage})` }}
            >
              <HeroContent />
            </section>

            <section id="features" className="features">
              <h2>Next-Level Features</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <h3>💬 Conversational Intelligence</h3>
                  <p>Chat naturally with AVRA and get real-time insights with contextual awareness.</p>
                </div>
                <div className="feature-card">
                  <h3>🎯 Hyper-Personalization</h3>
                  <p>Custom AI responses based on your past queries, tone, and research style.</p>
                </div>
                <div className="feature-card">
                  <h3>🔍 Semantic Deep Dive</h3>
                  <p>Dig deeper with understanding-based search that captures nuance and meaning.</p>
                </div>
                <div className="feature-card">
                  <h3>📄 Instant Summaries</h3>
                  <p>Upload lengthy PDFs, and AVRA extracts the key points in seconds.</p>
                </div>
                <div className="feature-card">
                  <h3>📝 Intelligent Notes</h3>
                  <p>Notes generated on-the-go as you explore ideas, topics, and documents.</p>
                </div>
                <div className="feature-card">
                  <h3>🌐 Verified Citations</h3>
                  <p>Automatically includes source links from reliable academic or peer-reviewed material.</p>
                </div>
              </div>
            </section>

            <section id="benefits" className="features">
              <h2>Why Choose AVRA?</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <h3>⏱ Save Time</h3>
                  <p>No more endless scrolling — AVRA summarizes and surfaces the most relevant insights instantly.</p>
                </div>
                <div className="feature-card">
                  <h3>🎓 Boost Understanding</h3>
                  <p>Designed for both depth and clarity — from complex topics to simple breakdowns.</p>
                </div>
                <div className="feature-card">
                  <h3>📚 Multi-Domain Support</h3>
                  <p>From science to literature, AVRA adapts to your field with domain-specific accuracy.</p>
                </div>
              </div>
            </section>

            <section id="testimonials" className="testimonials">
              <h2>User Voices</h2>
              <div className="testimonial-card">
                <p>“AVRA cut my research time in half! It’s like having a supercharged assistant on call.”</p>
                <div className="testimonial-author">— Alex T., Research Analyst</div>
              </div>
              <div className="testimonial-card">
                <p>“As a student juggling assignments, AVRA has been a lifesaver with its summarization and notes!”</p>
                <div className="testimonial-author">— Priya M., University Student</div>
              </div>
            </section>

            <section id="about" className="features">
              <h2>About AVRA</h2>
              <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
                AVRA (AI Virtual Research Assistant) is your always-available companion in knowledge exploration.
                It leverages advanced machine learning and natural language processing to interpret, assist, and
                enhance your workflow — giving you back the time to focus on critical thinking and creativity.
              </p>
            </section>

            <section id="contact" className="contact">
              <h2>Let’s Collaborate</h2>
              <div className="contact-form">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message"></textarea>
                <button className="submit-button">Send Message</button>
              </div>
            </section>

            <footer>
              <p>&copy; 2024 AVRA. Empowering curiosity, one insight at a time. Crafted with ❤️ for thinkers everywhere.</p>
            </footer>
          </>
        } />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
