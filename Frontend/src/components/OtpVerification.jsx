import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== '' && index < 5) {
      const nextInput = element.parentElement.nextElementSibling?.querySelector('input');
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('Verifying OTP:', otpValue);
    // Add your OTP verification logic here
  };

  return (
    <div className="signup-container">
      <div className="login-box">
        <h2>Verify Your Email</h2>
        <p className="login-subtitle">Please enter the 6-digit code sent to your email</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="otp-container">
            {otp.map((data, index) => (
              <div className="otp-input-box" key={index}>
                <input
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
                />
              </div>
            ))}
          </div>
          
          <button type="submit" className="login-button">
            Verify Email
          </button>
        </form>
        
        <p className="signup-prompt">
          Didn't receive the code? <button className="resend-btn">Resend</button>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification; 