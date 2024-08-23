import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTransfers, deleteTransfer } from '../../services/api';
import '../../css/PatientList.css';

const TransferList = () => {
    const [transfers, setTransfers] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const role = localStorage.getItem('role');

    useEffect(() => {
        getTransfers().then((response) => {
            if (response.data) {
                setTransfers(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the transfers!', error);
        });
    }, []);

    const handleAddTransferClick = (e) => {
        e.preventDefault();
        if (role === 'Administrator' || role === 'Doctor') {
            navigate('/transfers/new');
        }else{
            navigate('/unauthorized');
        }
    };

    const handleTransferDetailClick = (e, id) => {
        e.preventDefault();
        if (role === 'Administrator' || role === 'Doctor') {
            navigate(`/transfers/${id}`);
        }else{
            navigate('/unauthorized');
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this transfer?");
        if (confirmDelete) {
            if (id && (role === 'Administrator' || role === 'Doctor')) {
                deleteTransfer(id)
                    .then(response => {
                        setMessage('Transfer deleted successfully');
                        setTimeout(() => {
                            setMessage('');
                        }, 3000);
                        getTransfers();
                        navigate('/transfers');
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        setMessage('Error deleting transfer');
                    });
            } else {
                console.error('ID is undefined : ',id, ' or incorrect role : ',role);
            }
        }
    };

    return (
        <center>
            <div className="patient-list-container">
                <h1>Transfers</h1>
                {message && <p className="message">{message}</p>}
                <center>
                    <button type="button" className="add-patient-button" onClick={handleAddTransferClick}>
                        Add Transfer
                    </button>
                </center>
                {transfers.length > 0 ? (
                    <div className="patient-cards">
                        {transfers.map((transfer) => (
                            <div key={transfer._id} className="patient-card">
                                <Link to="#" onClick={(e) => handleTransferDetailClick(e, transfer._id)}>
                                    <p>Date: {new Date(transfer.transferDate).toLocaleDateString()}</p>
                                </Link>
                                <button onClick={() => handleDelete(transfer._id)} type="button">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No transfers found</p>
                )}
            </div>
        </center>
    );
};

export default TransferList;
