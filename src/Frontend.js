import React, { useState} from 'react';
function Frontend() {
    const [returnedData, setReturnedData] = useState({});
    const [person, setPerson] = useState({ 
        ID: 0, 
        NAME: '', 
        COURSE: '', 
        YEAR: 0 ,
        DATEOFBIRTH: '',
        PHONE:'',
    });

    //  Take input from frontend 
    const setInput = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setPerson((prevState )=> ({
          ...prevState,
          [name]: value
        }));
      }

      //creating student from frontend 
  const createStudent = async () => {
    console.log('Creating Student:', person);
    const newData = await fetch('/api/createStudent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({
        ...person
        })
    })
      .then(res => res.json());
    console.log(newData);
    setReturnedData(newData[0] || {});
  }


  //  //deleting student from frontend 
  const DeleteStudent = async () => {
    console.log('Deleting Student:', person);
    try {
        const response = await fetch('/api/DeleteStudent', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
              ...person,
            }),
        });
        
        const result = await response.json();
        console.log("Delete operation result:", result); 
      
    } catch (error) {
        console.error("Error during delete operation:", error);
    }
};


// Updating the student 
const UpdateStudent = async () => {
    try {
        const response = await fetch('/api/updatestudent', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
              ...person,
            }),
        });
        
        const result = await response.json();
        console.log("Update operation result:", result.updatedData); 
        setReturnedData(result.updatedData);
      
    } catch (error) {
        console.error("Error during Update operation:", error);
    }
  
  
  };
  
  return (
    <div className="App">
        <div className="App2">
        <input type="number" name="ID" placeholder="ID" onChange={setInput}></input>
          <input type="text" name="NAME" placeholder="Name" onChange={setInput}></input>
          <input type="text" name="COURSE" placeholder="COURSE" onChange={setInput}></input>
          <input type="number" name="YEAR" placeholder="YEAR" onChange={setInput}></input>
          <input type="date" name="DATEOFBIRTH" placeholder="DATEOFBIRTH" onChange={setInput}></input>
          <input type="number" name="PHONE" placeholder="PHONE" onChange={setInput}></input>
          <br></br>
          <button onClick={createStudent}>Create Student</button>

          <button onClick={DeleteStudent}>Delete Student</button>

          <button onClick={UpdateStudent}>Update Student</button>
        </div>
    </div>
  );
}

export default Frontend;

