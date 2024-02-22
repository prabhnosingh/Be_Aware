import studentsc from '../models/student.js';

export const getStudents = async (req,res)=> {
    try {
        const allStudents = await studentsc.find();

        res.status(200).json(allStudents);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}           

export const createStudent = async(req,res)=> {
    const studentData = req.body;
    // console.log(studentData);  
    // console.log("---------9");  
    
    const newStudent = new studentsc(studentData);
                            //model //variable

    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(409).json({ message:error.message });
    }
}

export const deleteStudent = async (req,res)=> {
    const id = req.params.id;
    try {
        await studentsc.findByIdAndRemove(id).exec();   
        res.send("Successfully deleted");
        
    } catch (error) {
        console.log(error);
        
    }
}          