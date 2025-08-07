import React, { useEffect } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
];

const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
        name: item?.source,
        amount: item?.amount
    }));


}

const RecentIncomeWithChart = ({ data, totalIncome }) => {
    const [charData, setCharData] = React.useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount
        }));
        setCharData(dataArr);
    };

    useEffect(() => {
        prepareChartData();
    }, [data]);
  return (
    <div className='card'>
        <div className='flex item-center justify-between'>
            <h5 className='text-lg'>
                Last 60 Days Income    
            </h5>'
        </div>

        <CustomPieChart
            data={charData}
            label='Total Income'
            totalAmount={`$${totalIncome}`}
            showTextAnchor
            colors={COLORS}
        />
    </div>
  )
}

export default RecentIncomeWithChart