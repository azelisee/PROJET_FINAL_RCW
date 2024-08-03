import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getNurses} from '../../services/api';

const NurseList = () => {
    const [nurses, setNurses] = useState([]);

    useEffect(() => {
        getNurses.getAll().then(data => setNurses(data));
    }, []);

    return (
        <div>
            <h2>Nurses</h2>
            <Link to="/nurses/new">Add New Nurse</Link>
            <ul>
                {nurses.map(nurse => (
                    <li key={nurse._id}>
                        <Link to={`/nurses/${nurse._id}`}>{nurse.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NurseList;
