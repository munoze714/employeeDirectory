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

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   API.getEmployee(this.state.search)
  //     .then(res => {
  //       if (res.data.status === "error") {
  //         throw new Error(res.data.message);
  //       }
  //       this.setState({ results: res.data. });
  //     })
  //     .catch(err => this.setState({ error: err.message }));
  // };
  console.log(state);
  var empsToDisplay = state.employees;

  if (state.filteredEmployees.length > 0) {
    empsToDisplay = state.filteredEmployees;
  }

  return (
    <>
      <div className="App">
        <input onChange={handleInputChange}></input>
        <table>
          <tbody>
            {empsToDisplay.map((emp, i) => {
              return (
                <tr key={i}>
                  <td>{emp.name}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.email}</td>
                  <td>
                    <img src={emp.pic}></img>
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
