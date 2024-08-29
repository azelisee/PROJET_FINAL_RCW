import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTransfer } from '../../services/api';
import {useVerifyAccess} from '../../utils/DecodeToken';
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

    const [message, setMessage] = useState({ type: '', content: '' });
    const navigate = useNavigate();

    const verifyAccess = useVerifyAccess(['Administrator', 'Doctor']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
            return;
        }
    }, [navigate, verifyAccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransfer({ ...transfer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createTransfer(transfer)
            .then(response => {
                setMessage({ type: 'success', content: 'Transfer created successfully!' });
                navigate('/transfers');
            })
            .catch(error => {
                setMessage({ type: 'error', content: 'Error creating transfer.' });
                console.error('Error creating transfer:', error);
            });
    };

    return (
        <center>
            <div className="form-container">
                <h2>Add Transfer</h2>
                {message.content && (
                    <div className={`message ${message.type}`}>
                        {message.content}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="patient"
                            placeholder="Patient ID"
                            value={transfer.patient}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="fromHospital"
                            placeholder="From Hospital ID"
                            value={transfer.fromHospital}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="toHospital"
                            placeholder="To Hospital ID"
                            value={transfer.toHospital}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="toDepartment"
                            placeholder="To Department ID"
                            value={transfer.toDepartment}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="date"
                            name="transferDate"
                            placeholder="Transfer Date"
                            value={transfer.transferDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="reason"
                            placeholder="Reason for Transfer"
                            value={transfer.reason}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-green">Add Transfer</button>
                </form>
            </div>
        </center>
    );
};

export default TransferForm;
