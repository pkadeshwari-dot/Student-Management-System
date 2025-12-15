import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from './StudentForm';

const AddStudent = () => {
    const navigate = useNavigate();

    const onSave = async (data) => {
        try {
            const response = await fetch('https://localhost:7280/api/school/AddStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    StudentName: data.studentName,
                    Class: data.class,
                    Age: data.age,
                    City: data.city,
                    Email: data.email,
                    FatherName: data.fatherName,
                    MotherName: data.motherName,
                    DOB: data.dob
                }),
            });
            if (!response.ok) throw new Error('Failed to add student');
            navigate('/');
            window.location.reload(); // Refresh to update the list
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const onCancel = () => {
        navigate('/');
    };

    return <StudentForm onSave={onSave} onCancel={onCancel} />;
};

export default AddStudent;