import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/OtpVerification.css';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Add API call to verify OTP
      const response = await fetch('http://localhost:8000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        // If OTP is verified, navigate to dashboard
        navigate('/dashboard');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-container">
        <div className="otp-box">
          <h2>Verify Your Email</h2>
          <p className="otp-description">
            We've sent a verification code to your email address{' '}
            <strong>{email}</strong>
          </p>
          <form onSubmit={handleSubmit} className="otp-form">
            <div className="form-group">
              <label>Enter Verification Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength="6"
                required
              />
            </div>
            <button type="submit" className="verify-button">
              Verify Email
            </button>
          </form>
          <div className="resend-link">
            Didn't receive the code?{' '}
            <button className="resend-button">Resend</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification; 