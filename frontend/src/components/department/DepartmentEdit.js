import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDepartmentById, updateDepartment } from '../../services/api';
import '../../css/PatientForm.css';

const DepartmentEdit = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({
        depNumber: '',
        name: '',
        description: '',
        hospital: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        getDepartmentById(id).then((response) => {
            if (response.data.department) {
                setDepartment(response.data.department);
            } else {
                console.error('Expected an object but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the department details!', error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDepartment(id, department)
            .then(response => {
                console.log('Department updated:', response.data);
                navigate('/departments');
            })
            .catch(error => console.error('Error updating department:', error));
    };

    return (
        <center>
            <div className="form-group">
            <h2>Edit Department</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="depNumber"
                    placeholder="Department Number"
                    value={department.depNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Department Name"
                    value={department.name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={department.description}
                    onChange={handleChange}
                ></textarea>
                <input
                    type="text"
                    name="hospital"
                    placeholder="Hospital ID"
                    value={department.hospital}
                    onChange={handleChange}
                    required
                />
                <button type="submit" style={{width:'175px'}}>Update Department</button>
            </form>
        </div>
        </center>
    );
};

export default DepartmentEdit;
