import React, { useEffect, useState } from 'react';
import { getDepartments } from '../../services/api';
const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getDepartments().then(data => setDepartments(data));
    }, []);

    return (
        <div>
            <h2>Departments</h2>
            <ul>
                {departments.map(department => (
                    <li key={department._id}>{department.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentList;
