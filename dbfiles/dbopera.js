const sql = require('mssql');
const dbconfig = require('./dbconfig'); 
//Get all data through api 


const getAllData = async () => {
  try {
    let pool = await sql.connect(dbconfig);
    let result = await pool.request().query('SELECT * FROM STUDENT');

    return result; // Return the full result
  } catch (error) {
    console.error('Error fetching all data:', error);
    throw error;
  }
};
// Create student through frontend 
const createStudent = async (Student) => {
  try {
      let pool = await sql.connect(dbconfig);
      let persons = await pool.request().query(`
          INSERT INTO Student (ID, NAME, COURSE, YEAR,DATEOFBIRTH,PHONE)
          VALUES (${Student.ID}, '${Student.NAME}', '${Student.COURSE}', '${Student.YEAR}','${Student.DATEOFBIRTH}','${Student.PHONE}')
      `);
    
      return persons;
  } catch (error) {
      console.log(error);
  }
};

// Delete student through frontend 
const DeleteStudent = async (ID) => {
  try {
      let pool = await sql.connect(dbconfig);
      let result = await pool.request()
          .input('ID', sql.Int, ID)
          .query('DELETE FROM Student WHERE ID= @ID');
      
          return result; 
  } catch (error) {
      console.log(error);
  }
};



const updatestudent = async (ID,NAME,COURSE,YEAR,DATEOFBIRTH,PHONE) => {
  try {
      let pool = await sql.connect(dbconfig);
      let result = await pool.request()
          .input('ID', sql.Int, ID)

          .input('NAME', sql.VarChar, NAME)

          .input('COURSE', sql.VarChar,COURSE)

          .input('YEAR', sql.Date, YEAR)

          .input('DATEOFBIRTH', sql.VarChar,DATEOFBIRTH)

          .input('PHONE', sql.VarChar,PHONE)

        

          .query('UPDATE DEMO SET NAME = @NAME, COURSE = @COURSE, YEAR = @YEAR,DATEOFBIRTH = @DATEOFBIRTH, PHONE = @PHONE WHERE ID = @ID');
      
          return {
              updatedData: { ID, NAME, COURSE, YEAR,DATEOFBIRTH, PHONE },
          };
  } catch (error) {
      console.log(error);
  }
};


module.exports = { getAllData,createStudent,DeleteStudent,updatestudent };
