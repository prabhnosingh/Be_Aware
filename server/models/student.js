import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    regNo: Number,
    studentName: String,
    grade: String,
    section: String
    // subjects:[String]
      
});

const studentsc = mongoose.model('student', studentSchema);

export default studentsc;
