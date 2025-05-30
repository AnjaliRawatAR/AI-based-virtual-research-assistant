import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import Summarization from './Summarization';
import KeyHighlights from './KeyHighlights';
import PlagiarismDetector from './PlagiarismDetector';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(searchQuery);
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`http://localhost:8000/search?query=${searchQuery}`);
      const data = await response.json();
      console.log(data);
      setSearchResults(data);
      console.log(searchResults);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>AVRA</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-home"></i>
            Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'summarization' ? 'active' : ''}`}
            onClick={() => setActiveTab('summarization')}
          >
            <i className="fas fa-align-left"></i>
            Summarization
          </button>
          <button 
            className={`nav-item ${activeTab === 'keyHighlights' ? 'active' : ''}`}
            onClick={() => setActiveTab('keyHighlights')}
          >
            <i className="fas fa-lightbulb"></i>
            Key Highlights
          </button>
          <button 
            className={`nav-item ${activeTab === 'plagDetector' ? 'active' : ''}`}
            onClick={() => setActiveTab('plagDetector')}
          >
            <i className="fas fa-copy"></i>
            Plagiarism Detector
          </button>
          <button 
            className={`nav-item ${activeTab === 'research' ? 'active' : ''}`}
            onClick={() => setActiveTab('research')}
          >
            <i className="fas fa-search"></i>
            Research
          </button>
          <button 
            className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <i className="fas fa-project-diagram"></i>
            Projects
          </button>
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <i className="fas fa-chart-bar"></i>
            Analytics
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog"></i>
            Settings
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-logo">AVRA</h1>
        </header>

        <main className="dashboard-content">
          {/* Overview Section */}
          {activeTab === 'overview' && (
            <div className="overview-section">
              <h1>Research Assistant Dashboard</h1>
              
              {/* Research Search Bar */}
              <div className="research-search-container">
                <form onSubmit={handleSearch} className="research-search-form">
                  <div className="search-input-wrapper">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ask your research question or search for topics..."
                      className="research-search-input"
                    />
                    <button type="submit" className="search-button">
                      <i className="fas fa-search"></i>
                      Search
                    </button>
                  </div>
                  <div className="search-suggestions">
                    <span className="suggestion-label">Popular searches:</span>
                    <div className="suggestion-tags">
                      <button className="suggestion-tag" onClick={() => setSearchQuery('Machine Learning')}>
                        Machine Learning
                        </button>
                      <button className="suggestion-tag" onClick={() => setSearchQuery('Data Analysis')}>
                        Data Analysis
                      </button>
                      <button className="suggestion-tag" onClick={() => setSearchQuery('AI Research')}>
                        AI Research
                      </button>
                      <button className="suggestion-tag" onClick={() => setSearchQuery('Scientific Papers')}>
                        Scientific Papers
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Recent Searches</h3>
                  <div className="stat-number">12</div>
                </div>
                <div className="stat-card">
                  <h3>Saved Papers</h3>
                  <div className="stat-number">8</div>
                </div>
                <div className="stat-card">
                  <h3>Research Topics</h3>
                  <div className="stat-number">5</div>
                </div>
                <div className="stat-card">
                  <h3>Citations</h3>
                  <div className="stat-number">24</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">
                      <i className="fas fa-search"></i>
                    </div>
                    <div className="activity-details">
                      <p>Searched for "Machine Learning Applications"</p>
                      <span>2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <i className="fas fa-bookmark"></i>
                    </div>
                    <div className="activity-details">
                      <p>Saved paper: "Deep Learning in Healthcare"</p>
                      <span>5 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="activity-details">
                      <p>Created new research topic: "AI Ethics"</p>
                      <span>1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Summarization Section */}
          {activeTab === 'summarization' && (
            <div className="summarization-section">
              <Summarization />
            </div>
          )}

          {/* Key Highlights Section */}
          {activeTab === 'keyHighlights' && (
            <div className="key-highlights-section">
              <KeyHighlights />
            </div>
          )}

          {/* Plagiarism Detector Section */}
          {activeTab === 'plagDetector' && (
            <div className="plagiarism-detector-section">
              <PlagiarismDetector />
            </div>
          )}

          {/* Research Section */}
          {activeTab === 'research' && (
            <div className="research-section">
              <h1>Research Dashboard</h1>
              <div className="research-grid">
                <div className="research-card">
                  <h3>Current Research</h3>
                  <div className="research-list">
                    <div className="research-item">
                      <h4>AI in Healthcare</h4>
                      <p>Progress: 75%</p>
                    </div>
                    <div className="research-item">
                      <h4>Machine Learning Models</h4>
                      <p>Progress: 45%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Section */}
          {activeTab === 'projects' && (
            <div className="projects-section">
              <h1>Projects</h1>
              <div className="projects-grid">
                <div className="project-card">
                  <h3>Project Alpha</h3>
                  <p>Status: In Progress</p>
                  <div className="project-progress">
                    <div className="progress-bar" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="project-card">
                  <h3>Project Beta</h3>
                  <p>Status: Planning</p>
                  <div className="project-progress">
                    <div className="progress-bar" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeTab === 'analytics' && (
            <div className="analytics-section">
              <h1>Analytics Dashboard</h1>
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>Research Performance</h3>
                  <div className="chart-placeholder">
                    Chart will be displayed here
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeTab === 'settings' && (
            <div className="settings-section">
              <h1>Settings</h1>
              <div className="settings-grid">
                <div className="settings-card">
                  <h3>Profile Settings</h3>
                  <form className="settings-form">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" defaultValue="John Doe" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" defaultValue="john@example.com" />
                    </div>
                    <button type="submit" className="save-button">Save Changes</button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          <div className="results-section">
            {isLoading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Searching for results...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="results-grid">
                {searchResults.map((result, index) => {
                  const isExpanded = expandedIndexes.includes(index);
                  const isLong = result.description.length > 300;
                  const toggleExpand = () => {
                    setExpandedIndexes(prev => prev.includes(index) ? prev.filter(i => i !== index): [...prev, index]
                  );
                };
                return (
                <div key={index} className="result-card">
                  <a href={result.link} target="_blank" rel="noopener noreferrer">
                    <h3>{result.title}</h3>
                  </a>
                  <p>{isExpanded || !isLong ? result.description : result.description.substring(0, 300) + '...'}</p>{isLong && ( <button className="read-more-button" onClick={toggleExpand}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
              )}
            <div className="result-meta">
              <span className="source">{result.source}</span>
              <span className="date">
                {new Date(result.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        );
      })}

      </div>
        ) : searchQuery ? (
            <div className="no-results">
            <p>No results found for "{searchQuery}"</p>
      </div>
      ) : (
        <div className="search-prompt">
          <p>Enter a research query to get started</p>
          </div>
        )}
        </div>
      </main>
    </div>
  </div>
  );
};

export default Dashboard;