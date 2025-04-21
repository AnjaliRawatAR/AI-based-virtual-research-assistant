import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Always allow access to dashboard
  return children;
};

export default ProtectedRoute; 