import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectOrderForChanging } from '../../redux/selectors'
import Button from '../Button/Button';
import { closeModal } from '../../redux/modalSlice/modalSlice';
import { updateOrderThunk } from '../../redux/ordersSlice/operations';

const AdminApproveForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const order = useAppSelector(selectOrderForChanging);
    const [isChecked, setIsChecked] = useState(false);
    const keys = Object.keys(order);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isChecked) {
            console.log('Форма надіслана!');
            const { _id, ...orderWithoutId } = order;
             delete orderWithoutId.createdAt;
             delete orderWithoutId.updatedAt;
           dispatch(updateOrderThunk({id: _id, orderToUpdate: {...orderWithoutId, adminApprove: true}})) 
        }
        dispatch(closeModal())
    }
  return (
    <div>
        <p className="mb-[10px] text-[12px] text-red-700">{`This request was created on /*{date}*/ and requires your immediate attention. Please contact the client using the provided contact details, and only after confirmation by both parties, mark the request as 'approved'.`}</p>
        <p>Order</p>
        <ul className='mb-[10px]'>
            {keys.map(k => {
                if(k === "time") {
                    return <li key={k}>{`${k}: start: ${new Date(order[k]?.startDate).toLocaleString()} returning: ${new Date(order[k]?.endDate).toLocaleString()}`}</li>
                }
                return <li key={k}>{`${k}: ${order[k]}`}</li>
            })}
        </ul>
            <form className='flex justify-between' onSubmit={handleFormSubmit}>
               <label className='self-center'><input required type="checkbox" onChange={handleCheckboxChange}/> I approve this order.</label>
               <Button type="submit" buttonName='change status' /> 
            </form>
    </div>
  )
}

export default AdminApproveForm