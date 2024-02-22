import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRoutes from './routes/student.js';
import { pass } from './credentials.js';
//hi there sample git commit
const app = express();

app.use(bodyParser.json({limit: "20mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "20mb", extended:true}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

  app.use(cors({
    origin: 'http://localhost:3000', // Adjust the allowed origin(s) as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Include DELETE here
  }));


app.use('/students', studentRoutes);
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
//   });



app.use(cors());

const CONNECTION_URL = 'mongodb+srv://prabh:'+ pass +'@cluster0.nfwgfdx.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=> app.listen(PORT, ()=>
    console.log(`Connection is established and running on port: ${PORT}`)   
)).catch((err)=> console.log(err.message));

    // mongoose.set('useFindAndModify', false); 