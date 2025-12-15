import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import StudentForm from './StudentForm';

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const student = location.state?.student;

    const onSave = async (data) => {
        try {
            const response = await fetch('https://localhost:7280/api/School/UpdateStudent', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: parseInt(id),
                    studentName: data.studentName,
                    age: data.age,
                    class: data.class,
                    city: data.city,
                    email: data.email,
                    fatherName: data.fatherName,
                    motherName: data.motherName,
                    dob: data.dob
                }),
            });
            if (!response.ok) throw new Error('Failed to update student');
            navigate('/');
            window.location.reload(); // Refresh to update the list
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const onCancel = () => {
        navigate('/');
    };

    return <StudentForm student={student} onSave={onSave} onCancel={onCancel} />;
};

export default EditStudent;