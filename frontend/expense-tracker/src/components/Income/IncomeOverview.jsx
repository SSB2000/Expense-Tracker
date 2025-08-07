import React, { useEffect } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';
import moment from 'moment';

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [charData, setCharData] = React.useState([]); 
    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setCharData(result);
    }, [transactions]);
  return (
    <div className='card'>
        <div className='flex flex-center justify-between'>
            <div className=''>
                <h5 className='test-lg'>
                    Income Overview
                </h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    Track your earnings overtime and analyze your income trends.
                </p>
            </div>

            <button className='add-btn' onClick={onAddIncome}>
                <LuPlus className='text-lg' />
                Add Income
            </button>

            
        </div>
        <div className='mt-10'>
                <CustomBarChart data={transactions}
                />
            </div>
    </div>
  )
}

export default IncomeOverview