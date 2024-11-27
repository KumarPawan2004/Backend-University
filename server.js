const express = require('express');
const dbOperation = require('./databasefiles/dbOperation');
const cors = require('cors');

const API_PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/api', async (req, res) => {
    const result = await dbOperation.getPerson(req.body.name);
    res.send(result.recordset);
});

app.post('/hello', async (req, res) => {
    await dbOperation.createPerson(req.body);
    const result = await dbOperation.getPerson(req.body.FirstName);
    res.send(result.recordset);
});


app.post('/delete', async (req, res) => {
    const { EmployeeID } = req.body;
    try {
        const result = await dbOperation.deletePerson(EmployeeID);  
        res.send(result);
    } catch (error) {
        console.error("Error deleting person:", error);
        res.status(500).send({ error: "Failed to delete person" });
    }
});

app.put('/update', async (req, res) => {
    const { EmployeeID,FirstName,LastName,BirthDate,Position } = req.body;
    try {
        const result = await dbOperation.updatePerson(EmployeeID,FirstName,LastName,BirthDate,Position);  
        res.json({
            message: "Update successful",
            updatedData: result.updatedData, 
        });
    } catch (error) {
        console.error("Error Updateing person:", error);
        res.status(500).send({ error: "Failed to Update person" });
    }
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));





