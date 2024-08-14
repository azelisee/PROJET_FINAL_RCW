import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTransfers, deleteTransfer } from '../../services/api';
import '../../css/PatientForm.css';
import '../../css/PatientList.css';

const TransferList = () => {
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        getTransfers().then((response) => {
            if (response.data.transfers) {
                setTransfers(response.data.transfers);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the transfers!', error);
        });
    }, []);

    const handleDelete = (id) => {
        deleteTransfer(id)
            .then(() => {
                setTransfers(transfers.filter(transfer => transfer._id !== id));
                console.log('Deleted successfully');
            })
            .catch(error => console.error('Error deleting:', error));
    };

    return (
        <center>
            <div className="patient-list-container">
            <h2>Transfer List</h2>
            <Link to="/transfers/new">Add Transfer</Link>
            {transfers.length > 0 ? (
                <ul>
                    {transfers.map((transfer) => (
                        <li key={transfer._id}>
                            <Link to={`/transfers/${transfer._id}`}>{`Transfer of Patient ${transfer.patient.name} from ${transfer.fromHospital.name} to ${transfer.toHospital.name}`}</Link>
                            <button onClick={() => handleDelete(transfer._id)} type="button">Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No transfers found</p>
            )}
        </div>
        </center>
    );
};

export default TransferList;
