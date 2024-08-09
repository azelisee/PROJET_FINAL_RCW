import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getTransferById, updateTransfer} from '../../services/api';

const TransferEdit = () => {
    const { id } = useParams();
    const history = useNavigate();
    const [transfer, setTransfer] = useState({
        roomNumber: '',
        bedNumber: '',
        department: ''
    });

    useEffect(() => {
        getTransferById.get(id).then(data => setTransfer(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransfer({ ...transfer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTransfer.update(id, transfer).then(() => {
            history.push(`/transfers/${id}`);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit transfer</h2>
            <input type="number" name="roomNumber" value={transfer.roomNumber} onChange={handleChange} placeholder="Room Number" required />
            <input type="number" name="bedNumber" value={transfer.bedNumber} onChange={handleChange} placeholder="Bed Number" required />
            <input type="text" name="department" value={transfer.department} onChange={handleChange} placeholder="Department ID" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default TransferEdit;
