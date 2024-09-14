const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const Student = require('../models/Student');
const router = express.Router();

// Create a Student
router.post('/', verifyToken, async (req, res) => {
    const { name, age, email } = req.body;
    try {
        const student = new Student({ name, age, email });
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get all Students
router.get('/', verifyToken, async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Update a Student
router.put('/:id', verifyToken, async (req, res) => {
    const { name, age, email } = req.body;
    try {
        let student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ msg: 'Student not found' });

        student.name = name;
        student.age = age;
        student.email = email;
        await student.save();

        res.json(student);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Delete a Student
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ msg: 'Student not found' });

        await student.remove();
        res.json({ msg: 'Student removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
