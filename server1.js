const express = require('express');
const cors = require('cors');

const dbOperation = require('./dbfiles/dbopera'); // Import database operations
const API_PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint to fetch student data
app.get('/api/getdata', async (req, res) => {
  try {
    const result = await dbOperation.getAllData();
    res.status(200).json(result.recordset); // Ensure the correct data structure is sent
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to create  student data

app.post('/api/createStudent', async (req, res) => {
  console.log('Request Body:', req.body); // Debug incoming data

  try {
      const result = await dbOperation.createStudent(req.body);
      res.status(201).send({ success: true, message: 'Student created successfully', result });
  } catch (error) {
      console.error('Error in /api/createStudent:', error);
      res.status(500).send({ success: false, message: 'Internal Server Error', error });
  }
  console.log(req.body)
});



//Endpoint to delete student data by id 

app.delete('/api/DeleteStudent', async (req, res) => {
  const {ID } = req.body;
  try {
      const result = await dbOperation.DeleteStudent(ID);  
      res.send(result);
  } catch (error) {
      console.error("Error deleting Student:", error);
      res.status(500).send({ error: "Failed to delete Student" });
  }
});

//Endpoint to Update  student data
app.put('/api/updatestudent', async (req, res) => {
  const { ID,NAME,COURSE,YEAR,DATEOFBIRTH,PHONE  } = req.body;
  try {
      const result = await dbOperation.updatestudent(ID,NAME,COURSE,YEAR,DATEOFBIRTH,PHONE );  
      res.json({
          message: "Update successful",
          updatedData: result.updatedData, 
      });
  } catch (error) {
      console.error("Error Updateing student:", error);
      res.status(500).send({ error: "Failed to Update student" });
  }
});

// Start the server
app.listen(API_PORT, () => console.log(`Listening on http://localhost:${API_PORT}`));
