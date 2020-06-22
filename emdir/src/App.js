import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import API from "./utils/API";

function App() {
  const [] = useState;

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount(){
    API.getEmployee()
      .then(res => this.setState({ employee: res.data }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {

  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getEmployee(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data. });
      })
      .catch(err => this.setState({ error: err.message }));
  };
  return (
    <>
      <div className="App">
        <SearchForm />
      </div>
    </>
  );
}

export default App;
