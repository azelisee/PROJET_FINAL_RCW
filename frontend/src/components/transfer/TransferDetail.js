import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getTransferById} from '../../services/api';

const TransferDetail = () => {
    const { id } = useParams();
    const [transfer, setTransfer] = useState(null);

    useEffect(() => {
        getTransferById.get(id).then(data => setTransfer(data));
    }, [id]);

    return (
        <div>
            {transfer ? (
                <>
                    <h2>Transfer {transfer.roomNumber}</h2>
                    <p>Bed Number: {transfer.bedNumber}</p>
                    <p>Department: {transfer.department}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TransferDetail;
