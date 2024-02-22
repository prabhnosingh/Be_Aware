//show students
import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



export default function ShowStudent() {

  const [studentsList, setStudentList] = useState([]);

  const deleteStudent = (id) =>{
    axios.delete(`http://localhost:5000/students/${id}`).then( () =>{
      window.location.reload(false);
    })
  }

  useEffect(() => {
    axios.get('http://localhost:5000/students').then((allStudents) => { //".then" is start of promise function
      setStudentList(allStudents.data);
    })
  }, [])

  return (

    <>
      <h2>ALL Students</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Registration Number</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right">Seciton</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsList.map((student, key) => (
              <TableRow
                key={key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {student.studentName}
                </TableCell>
                <TableCell align="right">{student.regNo}</TableCell>
                <TableCell align="right">{student.grade}</TableCell>
                <TableCell align="right">{student.section}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="delete" size="small" onClick={() => deleteStudent(student._id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}