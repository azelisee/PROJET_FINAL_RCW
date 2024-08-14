import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTransfer } from '../../services/api';
import '../../css/PatientForm.css';

const TransferForm = () => {
    const [transfer, setTransfer] = useState({
        patient: '',
        fromHospital: '',
        toHospital: '',
        toDepartment: '',
        transferDate: '',
        reason: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransfer({ ...transfer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createTransfer(transfer)
            .then(response => {
                console.log('Transfer created:', response.data);
                navigate('/transfers');
            })
            .catch(error => console.error('Error creating transfer:', error));
    };

    return (
        <center>
            <div className="patient-form-container">
            <h2>Add Transfer</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="patient"
                    placeholder="Patient ID"
                    value={transfer.patient}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="fromHospital"
                    placeholder="From Hospital ID"
                    value={transfer.fromHospital}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="toHospital"
                    placeholder="To Hospital ID"
                    value={transfer.toHospital}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="toDepartment"
                    placeholder="To Department ID"
                    value={transfer.toDepartment}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="transferDate"
                    placeholder="Transfer Date"
                    value={transfer.transferDate}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="reason"
                    placeholder="Reason for Transfer"
                    value={transfer.reason}
                    onChange={handleChange}
                    required
                />
                <button type="submit" style={{width:'175px'}}>Add Transfer</button>
            </form>
        </div>
        </center>
    );
};

export default TransferForm;
