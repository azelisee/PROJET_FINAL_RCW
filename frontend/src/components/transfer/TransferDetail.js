import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTransferById } from '../../services/api';
import '../../css/PatientDetail.css';

const TransferDetail = () => {
    const { id } = useParams();
    const [transfer, setTransfer] = useState(null);

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

    if (!transfer) return <div>Loading...</div>;

    return (
        <center>
            <div className="patient-detail-container">
                <h2>Transfer Details</h2>
                <p><strong>Patient:</strong> {transfer.patient.name}</p>
                <p><strong>From Hospital:</strong> {transfer.fromHospital.name}</p>
                <p><strong>To Hospital:</strong> {transfer.toHospital.name}</p>
                <p><strong>To Department:</strong> {transfer.toDepartment.name}</p>
                <p><strong>Transfer Date:</strong> {new Date(transfer.transferDate).toLocaleDateString()}</p>
                <p><strong>Reason:</strong> {transfer.reason}</p>
                <Link to={`/transfers/${transfer._id}/edit`}>Edit Transfer</Link>
            </div>
        </center>
    );
};

export default TransferDetail;
