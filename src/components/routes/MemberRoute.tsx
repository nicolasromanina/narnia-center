// components/routes/MemberRoute.jsx
import { Navigate } from 'react-router-dom';

const MemberRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('User info:', user);
  if (!user || user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default MemberRoute;
