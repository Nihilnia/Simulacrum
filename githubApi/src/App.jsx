import { useState, useEffect } from "react";
import Form from "./Form";

import "./App.css";
import "./Table.css";

export default function App() {
  const [ls, setLS] = useState(
    JSON.parse(localStorage.getItem("gitHubUserz")) || []
  );
  const [tempData, setTempData] = useState("");

  useEffect(() => {
    localStorage.setItem("gitHubUserz", JSON.stringify(ls));
  }, [ls]);

  function handleChange(e) {
    console.log("Somethings changed..");

    const { value } = e.target;

    setTempData(() => value);
  }

  function handleEnter(e) {
    e.preventDefault();
    console.log("Data submitted..");
    console.log(`
      Username: ${tempData}`);

    fetch(`https://api.github.com/users/${tempData}`)
      .then((resp) => resp.json())
      .then((data) => setLS((prev) => [...prev, data]))
      .catch((err) => alert(err.message));
  }

  function handleDelete(e) {
    console.log("Clicked.");

    let currentLS = ls;
    console.log(currentLS);
    console.log("User: " + e.target.name);

    for (let f = 0; f < ls.length; f++) {
      if (ls[f].id == e.target.name) {
        console.log("Found. " + ls[f].login);
        currentLS.splice(currentLS.indexOf(ls[f]), 1);
      }
    }

    localStorage.setItem("gitHubUserz", JSON.stringify(currentLS));
    location.reload();
  }

  return (
    <>
      <Form
        handleChange={handleChange}
        handleEnter={handleEnter}
        handleDelete={handleDelete}
        currentUserz={ls}
      />
    </>
  );
}
