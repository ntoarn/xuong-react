import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
    <Outlet />
    </>
    
  );
};

export default PrivateRoutes;
 