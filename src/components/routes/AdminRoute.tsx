// components/routes/AdminRoute.jsx
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('User info:', user);
  if (!user || !user.isAdmin || user.email !== 'nicolasromanina@gmail.com') {
    return <Navigate to="/login" replace />;
  }

  return children;
};



export default AdminRoute;
