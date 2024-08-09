import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getTransfers} from '../../services/api';

const TransferList = () => {
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        getTransfers.getAll().then(data => setTransfers(data));
    }, []);

    return (
        <div>
            <h2>Transfers</h2>
            <Link to="/transfers/new">Add New Transfer</Link>
            <ul>
                {transfers.map(transfer => (
                    <li key={transfer._id}>
                        <Link to={`/transfers/${transfer._id}`}>{transfer.roomNumber} - {transfer.bedNumber}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransferList;
