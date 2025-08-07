import React, { useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import { toast } from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import { useUserAuth } from '../../hooks/useUserAuth';
import DeleteAlert from '../../components/DeleteAlert';

export const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState({
    show: false,
    data: null
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = React.useState(false);

  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error('Error fetching income details:', error);
    } finally {
      setLoading(false);
    }
  };

  // handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source.trim()) {
      toast.error('Source is required. Please provide a valid source.');
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error('Amount must be a valid number greater than zero.');
      return;
    }

    if (!date) {
      toast.error('Date is required. Please select a valid date.');
      return;
    }

    try {
      await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, {
        source,
        amount,
        date,
        icon
      });

      setOpenAddIncomeModal(false);

      toast.success('Income added successfully!');
      fetchIncomeDetails();
    } catch (error) {
      console.error('Error adding income:', error.response?.data?.message || error.message);
    }
  };

  // Logic to delete income
  const deleteIncome = async (incomeId) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(incomeId));
      setOpenDeleteAlert({
        show: false,
        data: null
      });
      toast.success('Income deleted.');
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        'Error deleting income: ',
        error.response?.data?.message || error.message
      )
    }
  };

  // Logic to download income details 
  const handleDownloadIncomeDetails = async () => {
    
  };

  useEffect(() => {
    fetchIncomeDetails();
    
    return () => {
    };
  }, []);

  return (
    <DashboardLayout activeMenu='Income'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview 
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div> 

        <IncomeList
          transactions={incomeData}
          onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id});
          }}
          onDownload={handleDownloadIncomeDetails}
        />
        <Modal
          isOpen={openAddIncomeModal}
          onclose={() => setOpenAddIncomeModal(false)}
          title='Add Income'
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onclose={() => setOpenDeleteAlert({ 
            show: false, 
            data: null, 
          })}
          title='Delete Income'
        >
          <DeleteAlert
           content='Are you sure you want to delete this income?'
           onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income