import React, { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import API from "./utils/API";

function App() {
  const [state, setState] = useState({
    employees: [],
    filteredEmployees: [],
  });

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  useEffect(() => {
    API.getEmployee()
      .then((res) => {
        console.log("this is our dataaa", res.data.results);
        var newEmps = [];
        var data = res.data.results;
        for (var i = 0; i < data.length; i++) {
          var emp = {
            name: data[i].name.first + " " + data[i].name.last,
            email: data[i].email,
            phone: data[i].phone,
            pic: data[i].picture.thumbnail,
          };
          newEmps.push(emp);
        }
        console.log("new data", newEmps);
        setState({ ...state, employees: newEmps });

        //this.setState({ employee: res.results })
      })
      .catch((err) => console.log(err));
  }, []);

  var handleInputChange = (event) => {
    var newFiltered = [];
    state.employees.forEach((empSearch) => {
      console.log("what they serached", event.target.value.toLowerCase());
      console.log(
        empSearch.name.substring(0, event.target.value.length).toLowerCase()
      );
      if (
        event.target.value.toLowerCase() ===
        empSearch.name.substring(0, event.target.value.length).toLowerCase()
      ) {
        console.log(" we found a match!! keep for filtered!!", empSearch);
        newFiltered.push(empSearch);
      }
    });
    console.log("these r the filted ppl", newFiltered);
    setState({ ...state, filteredEmployees: newFiltered });
  };

  console.log(state);
  var empsToDisplay = state.employees;

  if (state.filteredEmployees.length > 0) {
    empsToDisplay = state.filteredEmployees;
  }

  return (
    <>
      <div className="App">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Employee Directory</h1>
            <p className="lead">Search</p>
            <input onChange={handleInputChange}></input>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">First</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {empsToDisplay.map((emp, i) => {
              return (
                <tr key={i}>
                  <td>
                    <img src={emp.pic}></img>
                  </td>
                  <td> {emp.name} </td>
                  <td>
                    <a href={"tel:+" + emp.phone}>{emp.phone}</a>
                  </td>
                  <td>
                    <a href={"mailto:" + emp.email}>{emp.email}</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
