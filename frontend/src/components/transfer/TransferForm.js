import React, { useState } from 'react';
import {createTransfer} from '../../services/api';
import { useNavigate } from 'react-router-dom';

const TransferForm = () => {
    const [transfer, setTransfer] = useState({
        roomNumber: '',
        bedNumber: '',
        department: ''
    });

    const history = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransfer({ ...transfer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createTransfer.create(transfer).then(() => {
            history.push('/transfers');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Transfer</h2>
            <input type="number" name="roomNumber" value={transfer.roomNumber} onChange={handleChange} placeholder="Room Number" required />
            <input type="number" name="bedNumber" value={transfer.bedNumber} onChange={handleChange} placeholder="Bed Number" required />
            <input type="text" name="department" value={transfer.department} onChange={handleChange} placeholder="Department ID" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default TransferForm;
