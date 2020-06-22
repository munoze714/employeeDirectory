import React, { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import API from "./utils/API";

function App() {
  const [state, setState] = useState({
    employees: [],
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

  // handleInputChange = event => {

  // };

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
  return (
    <>
      <div className="App">
        <table>
          {state.employees.map((emp) => {
            return (
              <tr>
                <td>{emp.name}</td>
                <td>{emp.phone}</td>
                <td>{emp.email}</td>
                <td>
                  <img src={emp.pic}></img>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default App;
