import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => 

  return (
    <DashboardLayout activeMenu='Dashboard'>
      <div className='my-5 mx=auto'>
        Hello
      </div>
    </DashboardLayout>
  );
};

export default Home;
