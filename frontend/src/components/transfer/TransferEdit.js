import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTransferById, updateTransfer } from '../../services/api';
import '../../css/PatientForm.css';

const TransferEdit = () => {
    const { id } = useParams();
    const [transfer, setTransfer] = useState({
        patient: '',
        fromHospital: '',
        toHospital: '',
        toDepartment: '',
        transferDate: '',
        reason: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        getTransferById(id).then((response) => {
            if (response.data.transfer) {
                setTransfer(response.data.transfer);
            } else {
                console.error('Expected an object but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the transfer details!', error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransfer({ ...transfer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTransfer(id, transfer)
            .then(response => {
                console.log('Transfer updated:', response.data);
                navigate('/transfers');
            })
            .catch(error => console.error('Error updating transfer:', error));
    };

    return (
        <center>
            <div className="patient-form-container">
            <h2>Edit Transfer</h2>
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
                <button type="submit">Update Transfer</button>
            </form>
        </div>
        </center>
    );
};

export default TransferEdit;
