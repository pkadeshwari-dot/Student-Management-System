import React, { useState, useEffect } from 'react';

const StudentForm = ({ student, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        studentName: '',
        class: '',
        age: '',
        city: '',
        email: '',
        fatherName: '',
        motherName: '',
        dob: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (student) {
            const calculatedAge = calculateAge(student.dob);
            setFormData({
                studentName: student.studentName || '',
                class: student.class || '',
                age: calculatedAge || '',
                city: student.city || '',
                email: student.email || '',
                fatherName: student.fatherName || '',
                motherName: student.motherName || '',
                dob: student.dob || ''
            });
        } else {
            setFormData({
                studentName: '',
                class: '',
                age: '',
                city: '',
                email: '',
                fatherName: '',
                motherName: '',
                dob: ''
            });
        }
    }, [student]);

    const calculateAge = (dob) => {
        if (!dob) return '';
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'dob') {
            const selectedDate = new Date(value);
            const today = new Date();
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 5);

            if (selectedDate > today) {
                setErrors({ ...errors, dob: 'DOB cannot be a future date' });
            } else if (selectedDate > minDate) {
                setErrors({ ...errors, dob: 'Student must be at least 5 years old' });
            } else {
                setErrors({ ...errors, dob: '' });
            }

            const newAge = calculateAge(value);
            setFormData({ ...formData, dob: value, age: newAge });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validate = () => {
        let tempErrors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key]) tempErrors[key] = `${key} is required`;
        });

        // DOB-specific errors
        if (errors.dob) tempErrors.dob = errors.dob;

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(errors).length > 0 && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    {Object.values(errors).map((err, i) => <div key={i}>{err}</div>)}
                </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                    <label>Student Name:</label>
                    <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required />
                </div>
                <div style={{ flex: 1 }}>
                    <label>Class:</label>
                    <input type="text" name="class" value={formData.class} onChange={handleChange} required />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                    <label>DOB:</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob ? formData.dob.split('T')[0] : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label>Age:</label>
                    <input type="number" name="age" value={formData.age} disabled />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div style={{ flex: 1 }}>
                    <label>City:</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                    <label>Father's Name:</label>
                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                </div>
                <div style={{ flex: 1 }}>
                    <label>Mother's Name:</label>
                    <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} required />
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancel</button>
            </div>
        </form>
    );
};

export default StudentForm;
