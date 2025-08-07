import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
        <div className='card'>
            <div className='flex item-center justify-between'>
                <h5 className='text-lg'>
                    Income
                </h5>
                <button onClick={onSeeMore} className='card-btn'>
                See All <LuArrowRight className='text-base' />
                </button>
            </div> 

            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={item.source}
                        icon={item.icon}
                        date={moment(item.date).format('do MMM YYYY')}
                        amount={item.amount}
                        type={'Income'}
                        hideDeleteBtn
                    />
                ))}
            </div>  
        </div>
    );
}

export default RecentIncome;