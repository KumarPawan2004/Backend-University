const sql = require('mssql');
const config = require('./dbConfig.js');

const getPerson = async (FirstName) => {
    try {
        let pool = await sql.connect(config);
        let persons = await pool.request()
            .input('FirstName', sql.VarChar, FirstName)
            .query('SELECT * FROM DEMO WHERE Firstname = @FirstName');
        
        return persons;
    } catch (error) {
        console.log(error);
    }
};

const createPerson = async (Person) => {
    try {
        let pool = await sql.connect(config);
        let persons = await pool.request()
            .input('EmployeeID', sql.Int, Person.EmployeeID)
            .input('FirstName', sql.VarChar, Person.FirstName)
            .input('LastName', sql.VarChar, Person.LastName)
            .input('BirthDate', sql.Date, Person.BirthDate)
            .input('Position', sql.VarChar, Person.Position)
            .query(`INSERT INTO DEMO (EmployeeID, FirstName, LastName, BirthDate, Position) 
                    VALUES (@EmployeeID, @FirstName, @LastName, @BirthDate, @Position)`);
      
        return persons;
    } catch (error) {
        console.log(error);
    }
};

const deletePerson = async (EmployeeID) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)
            .query('DELETE FROM DEMO WHERE EmployeeID= @EmployeeID');
        
            return result; 
    } catch (error) {
        console.log(error);
    }
};

const updatePerson = async (EmployeeID,FirstName,LastName,BirthDate,Position) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('EmployeeID', sql.Int, EmployeeID)

            .input('FirstName', sql.VarChar, FirstName)

            .input('LastName', sql.VarChar,LastName)

            .input('BirthDate', sql.Date, BirthDate)

            .input('Position', sql.VarChar,Position)

            .query('UPDATE DEMO SET FirstName = @FirstName, LastName = @LastName, BirthDate = @BirthDate, Position = @Position WHERE EmployeeID = @EmployeeID');
        
            return {
                updatedData: { EmployeeID, FirstName, LastName, BirthDate, Position },
            };
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createPerson,
    getPerson,
    deletePerson,
    updatePerson
};





