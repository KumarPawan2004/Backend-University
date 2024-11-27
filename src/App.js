import React, { useState } from 'react';
import './App.css';

function App() {
  const [returnedData, setReturnedData] = useState('');
  const [employee, setEmployee] = useState({
    EmployeeID: 0,
    FirstName: '',
    LastName: '',
    BirthDate: '',
    Position: '',
  });
  
  const [employeeList, setEmployeeList] = useState([]); // State to store all employees

  const setInput = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    const newData = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: employee.FirstName,
      }),
    }).then((res) => res.json());

    setReturnedData(newData[0]);
  };

  const createPerson = async () => {
    const newEmployee = await fetch('/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...employee,
      }),
    }).then((res) => res.json());

    setReturnedData(newEmployee[0]);

    // Add new employee to the employeeList
    setEmployeeList((prevList) => [...prevList, newEmployee[0]]);
  };


  const deletePerson = async () => {
    try {
        const response = await fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
              ...employee,
            }),
        });
        
        const result = await response.json();
        console.log("Delete operation result:", result); 
      
    } catch (error) {
        console.error("Error during delete operation:", error);
    }
};

//Update person 
const updatePerson = async () => {
  try {
      const response = await fetch('/update', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
          },
          body: JSON.stringify({
            ...employee,
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
      <input
        type="number"
        name="EmployeeID"
        placeholder="EmployeeID"
        onChange={setInput}
      />
      <input
        name="FirstName"
        placeholder="FirstName"
        onChange={setInput}
      />
      <input
        name="LastName"
        placeholder="LastName"
        onChange={setInput}
      />
      <input
        type="date"
        name="BirthDate"
        placeholder="BirthDate"
        onChange={setInput}
      />
      <input
        name="Position"
        placeholder="Position"
        onChange={setInput}
      />

      <button onClick={fetchData}>Fetch</button>

      <button onClick={createPerson}>Create</button>

      <button onClick={deletePerson}>Delete</button>

      <button onClick={updatePerson}>Update</button>

      <h2>Employee Details</h2>
      <p> EmployeeID: {returnedData?.EmployeeID || ''}</p>
      <p> FirstName: {returnedData?.FirstName || ''}</p>
      <p> LastName: {returnedData?.LastName || ''}</p>
      <p> BirthDate: {returnedData?.BirthDate || ''}</p>
      <p> Position: {returnedData?.Position || ''}</p>
    </div>
  );
}

export default App;




