import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validatePasswords = () => {
    return formData.password === formData.confirmPassword;
  };
   

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) {
      alert('Passwords do not match');
      return;
    }
  
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,  
    };
  
    try {
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Signup successful! Redirecting to login...');
        navigate('/login');
      } else {
        alert(data.detail || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if(!validatePasswords()){
  //   // Handle signup logic here
    
  //   console.log('Signup attempt with:', formData);
  //   // After successful signup, redirect to OTP verification
  //   try{
  //     const response = await fetch('http://localhost:8000/auth/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   }catch(err){
  //     console.log(err);
  //   }

  //   if(response.status === 201){
  //     navigate('/verify-email')
  //   }else{
  //     alert(data.error);
  //   }
    
  // }else{
  //   alert('Passwords do not match');
  // }
  // };

  return (
    <div className="signup-container">
      <div className="login-box">
        <h2>Create Account</h2>
        <p className="login-subtitle">Please fill in your details to sign up</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>
        
        <p className="signup-prompt">
          Already have an account? <Link to="/login" className="signup-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup; 