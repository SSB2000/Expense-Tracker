import React, { useEffect } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { toast } from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from '../../components/Modal';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

export const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState({
    show: false,
    data: null
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = React.useState(false);

  // Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error('Error fetching income details:', error);
    } finally {
      setLoading(false);
    }
  };

  // handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category.trim()) {
      toast.error('category is required. Please provide a valid category.');
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
      await axiosInstance.post(`${API_PATHS.EXPENSE.ADD_EXPENSE}`, {
        category,
        amount,
        date,
        icon
      });

      setOpenAddExpenseModal(false);

      toast.success('Expense added successfully!');
      fetchExpenseDetails();
    } catch (error) {
      console.error('Error adding expense:', error.response?.data?.message || error.message);
    }
  };

  // Logic to delete expense
  const deleteExpense = async (expenseId) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(expenseId));
      setOpenDeleteAlert({
        show: false,
        data: null
      });
      toast.success('Expense deleted.');
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        'Error deleting expense: ',
        error.response?.data?.message || error.message
      )
    }
  };

  // Logic to download expense details 
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: 'blob'
        }
      );

      // Create URL for the blob file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading expense details:', error);
      toast.error('Failed to download expense details. Please try again.')
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  
    return () => {
      
    }
  }, [])
  

  return (
    <DashboardLayout activeMenu='Expense'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true, data: id
              })
            }}
            onDownload={handleDownloadExpenseDetails}
            />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title='Add Expense'
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onclose={() => setOpenDeleteAlert({ 
            show: false, 
            data: null, 
          })}
          title='Delete Expense'
        >
          <DeleteAlert
           content='Are you sure you want to delete this expense?'
           onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>

      </div>
    </DashboardLayout>
  )
}

export default Expense