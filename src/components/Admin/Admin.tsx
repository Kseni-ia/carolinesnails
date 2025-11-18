import React from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const Admin: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
};

export default Admin;
