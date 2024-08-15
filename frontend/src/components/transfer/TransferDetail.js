import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getTransferById } from '../../services/api';
import {useVerifyAccess} from '../../utils/DecodeToken';
import '../../css/PatientDetail.css';

const TransferDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transfer, setTransfer] = useState(null);

    const verifyAccess = useVerifyAccess(['Administrator', 'Doctor']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
            return;
        }

        getTransferById(id).then((response) => {
            setTransfer(response.data);
        }).catch(error => {
            console.error('There was an error fetching the transfer details!', error);
        });
    }, [id, navigate, verifyAccess]);

    if (!transfer) return <div>Loading...</div>;

    return (
        <div className="patient-detail-container">
            <h2>Transfer Details</h2>
            <div className="patient-detail-field"><p><strong>Patient:</strong> {transfer.patient.name}</p></div>
            <div className="patient-detail-field"><p><strong>From Hospital:</strong> {transfer.fromHospital.name}</p></div>
            <div className="patient-detail-field"><p><strong>To Hospital:</strong> {transfer.toHospital.name}</p></div>
            <div className="patient-detail-field"><p><strong>To Department:</strong> {transfer.toDepartment.name}</p></div>
            <div className="patient-detail-field"><p><strong>Transfer Date:</strong> {new Date(transfer.transferDate).toLocaleDateString()}</p></div>
            <div className="patient-detail-field"><p><strong>Reason:</strong> {transfer.reason}</p></div>
            <center><Link to={`/transfers/${transfer._id}/edit`} className="btn" style={{ width: '150px' }}>Edit Transfer</Link></center>
        </div>
    );
};

export default TransferDetail;
