import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('https://localhost:7280/api/School/GetAllStudents', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Failed to fetch students');
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const addStudents = async (studentsToAdd) => {
        try {
            const response = await fetch('https://localhost:7280/api/school/AddStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentsToAdd),
            });
            if (!response.ok) throw new Error('Failed to add students');
            const result = await response.json();
            console.log('Students added:', result);
            fetchStudents();
        } catch (error) {
            console.error('Error adding students:', error);
        }
    };

    const updateStudent = async (student) => {
        try {
            const response = await fetch('https://localhost:7280/api/School/UpdateStudent', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: student.id,
                    studentName: student.studentName,
                    age: student.age,
                    class: student.class,
                    city: student.city,
                    email: student.email,
                    fatherName: student.fatherName,
                    motherName: student.motherName,
                    dob: student.dob
                }),
            });
            if (!response.ok) throw new Error('Failed to update student');
            const result = await response.json();
            console.log('Student updated:', result);
            fetchStudents();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const deleteStudent = async (id) => {
        try {
            const response = await fetch(`https://localhost:7280/api/School/DeleteStudent/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Failed to delete student');
            console.log('Student deleted');
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const onEdit = (student) => {
        navigate(`/edit/${student.id}`, { state: { student } });
    };

    const onDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            deleteStudent(id);
        }
    };

    return (
        <div>
            <button onClick={() => navigate('/add')}style={{marginLeft:'20px'}}>Add Student</button>
            <table border="1" style={{ width: '97%', margin:'20px',borderCollapse:'collapse' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>DOB</th>
                        <th>Age</th>
                        <th>City</th>
                        <th>Email</th>
                        <th>Father</th>
                        <th>Mother</th>
            
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.studentName}</td>
                            <td>{student.class}</td>
                            <td>{student.dob ? student.dob.split('T')[0] : ''}</td>
                            <td>{student.age}</td>
                            <td>{student.city}</td>
                            <td>{student.email}</td>
                            <td>{student.fatherName}</td>
                            <td>{student.motherName}</td>
                            <td style={{textAlign:'center'}}>
                                <button onClick={() => onEdit(student)}style={{padding:'6px 12px',marginRight:'5px'}}>Edit</button>
                                <button onClick={() => onDelete(student.id)}style={{padding:'6px 12px',marginRight:'5px'}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;