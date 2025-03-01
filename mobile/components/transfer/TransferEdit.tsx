import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTransferById, updateTransfer } from '../../services/api';
import { useVerifyAccess } from '../../utils/DecodeToken';
import '../../css/PatientForm.css';

interface Transfer {
    patient: string;
    fromHospital: string;
    toHospital: string;
    toDepartment: string;
    transferDate: string;
    reason: string;
}

const TransferEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [transfer, setTransfer] = useState<Transfer>({
        patient: '',
        fromHospital: '',
        toHospital: '',
        toDepartment: '',
        transferDate: '',
        reason: ''
    });
    const [error, setError] = useState<string>('');

    const verifyAccess = useVerifyAccess(['Administrator', 'Doctor']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
            return;
        }

        getTransferById(id!)
            .then((response) => {
                setTransfer(response.data);
            })
            .catch((error) => {
                setError('There was an error fetching the transfer details!');
                console.error('There was an error fetching the transfer details!', error);
            });
    }, [id, navigate, verifyAccess]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTransfer({ ...transfer, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateTransfer(id!, transfer)
            .then(() => {
                navigate(`/transfers/${id}`);
            })
            .catch((error) => {
                setError('There was an error updating the transfer!');
                console.error('There was an error updating the transfer!', error);
            });
    };

    return (
        <center>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Edit Transfer</h2>
                {error && <p>{error}</p>}
                <div className="form-group">
                    <input
                        type="text"
                        name="patient"
                        value={transfer.patient}
                        onChange={handleChange}
                        placeholder="Patient ID"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="fromHospital"
                        value={transfer.fromHospital}
                        onChange={handleChange}
                        placeholder="From Hospital ID"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="toHospital"
                        value={transfer.toHospital}
                        onChange={handleChange}
                        placeholder="To Hospital ID"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="toDepartment"
                        value={transfer.toDepartment}
                        onChange={handleChange}
                        placeholder="To Department ID"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        name="transferDate"
                        value={transfer.transferDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="reason"
                        value={transfer.reason}
                        onChange={handleChange}
                        placeholder="Reason for Transfer"
                    ></textarea>
                </div>
                <br />
                <center>
                    <button type="submit" style={{ width: '175px' }} className="btn-green">
                        Submit
                    </button>
                </center>
            </form>
        </center>
    );
};

export default TransferEdit;
