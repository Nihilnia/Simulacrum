import { useState, useEffect } from "react";
import { userzCollection, db } from "./Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

import Login from "./Login/Login.jsx";
import Register from "./Register/Register";

import "./App.css";

export default function App() {
  const [userz, setUserz] = useState([]);
  const [tempData, setTempData] = useState({
    userName: "",
    passWord: "",
  });

  useEffect(() => {
    //? Watching the Database
    const unsub = onSnapshot(userzCollection, (snapshot) => {
      snapshot.docs.length == 0
        ? console.log("%cDatabase is empty now..", "color: orange")
        : console.log("%cDatabase is changing..", "color: orange");

      const allUserz = snapshot.docs.map((user) => {
        return {
          id: user.id,
          ...user.data(),
        };
      });

      //? READIN':
      setUserz(allUserz);
    });

    return unsub;
  }, []);

  const handleChange = (e) => {
    console.log("Change happened..");
    // console.log(e.target);

    const { name, value } = e.target;

    setTempData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();

      let getUsername = userz.filter(
        (user) => user.userName == tempData.userName
      );

      getUsername.length > 0
        ? getUsername[0].passWord == tempData.passWord
          ? console.log("%cLogin succesful..", "color: orange")
          : console.log("%cPassword is wrong.", "color: orange")
        : console.log("%cUser not found..", "color: orange");

      e.target.parentElement.reset();
    }
  };

  const [page, setPage] = useState("Login");

  const handlePaging = (e, incominPage) => {
    setPage(incominPage);

    return page;
  };

  return (
    <>
      {page == "Login" && (
        <Login
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handlePaging={handlePaging}
        />
      )}
      {page == "Register" && (
        <Register
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handlePaging={handlePaging}
        />
      )}
    </>
  );
}
