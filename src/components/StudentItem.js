import React, { useState, useEffect } from 'react';
import StudentItem from './StudentItem';
import StudentForm from './StudentForm';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('https://localhost:7280/api/school/GetStudents'); // Assuming this endpoint
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
                method: 'GET', // Change to 'POST' if needed
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
                    id: student.Id,
                    studentName: student.StudentName,
                    age: student.Age,
                    class: student.Class,
                    city: student.City,
                    email: student.Email,
                    fatherName: student.FatherName,
                    motherName: student.MotherName,
                    dob: student.DOB
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
        setEditingStudent(student);
        setShowForm(true);
    };

    const onDelete = (id) => {
        deleteStudent(id);
    };

    const onBulkAdd = (studentsToAdd) => {
        addStudents(studentsToAdd);
    };

    const onSave = (formData) => {
        if (editingStudent) {
            updateStudent({ ...formData, Id: editingStudent.Id });
        } else {
            addStudents([formData]);
        }
        setEditingStudent(null);
        setShowForm(false);
    };

    const onCancel = () => {
        setEditingStudent(null);
        setShowForm(false);
    };

    const onSelect = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div>
            <button onClick={() => setShowForm(true)}>Add Student</button>
            {showForm && (
                <StudentForm 
                    student={editingStudent} 
                    onSave={onSave} 
                    onCancel={onCancel} 
                />
            )}
            {students.map(student => (
                <StudentItem 
                    key={student.Id} 
                    student={student} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                    isSelected={selectedIds.includes(student.Id)} 
                    onSelect={onSelect} 
                    onBulkAdd={onBulkAdd} 
                />
            ))}
        </div>
    );
};

export default StudentList;