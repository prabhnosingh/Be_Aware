import express from 'express';
import { getStudents, createStudent, deleteStudent } from '../controllers/student.js';
import student from '../models/student.js';

const router = express.Router();

//adding a route

router.get('/', getStudents);
router.post('/', createStudent);
router.delete('/:id', deleteStudent);


//exporting the router

export default router;