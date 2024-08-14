import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNurses, deleteNurse } from '../../services/api';
import '../../css/PatientForm.css';
import '../../css/PatientList.css';

const NurseList = () => {
    const [nurses, setNurses] = useState([]);

    useEffect(() => {
        getNurses().then((response) => {
            if (response.data.nurses) {
                setNurses(response.data.nurses);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the nurses!', error);
        });
    }, []);

    const handleDelete = (id) => {
        deleteNurse(id)
            .then(response => {
                setNurses(nurses.filter(nurse => nurse._id !== id));
            })
            .catch(error => console.error('Error deleting:', error));
    }

    return (
        <center>
            <div className="patient-list-container">
            <center>
                <h2>Nurse List</h2>
                <button type="button">
                    <Link to="/nurses/new">Add Nurse</Link>
                </button>
            </center>
            {nurses.length > 0 ? (
                <ul>
                    {nurses.map((nurse) => (
                        <li key={nurse._id}>
                            <Link to={`/nurses/${nurse._id}`}>{nurse.name}</Link>
                            <button onClick={() => handleDelete(nurse._id)} type="button">Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No nurses found</p>
            )}
        </div>
        </center>
    );
};

export default NurseList;
