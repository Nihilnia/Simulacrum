import { useState, useEffect } from "react";
import { userzCollection, db } from "./Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

import Login from "./Login/Login.jsx";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";

// import "./App.css";

export default function App() {
  const [userz, setUserz] = useState([]);
  const [tempData, setTempData] = useState({
    userName: "",
    passWord: "",
  });
  const [page, setPage] = useState("Login");

  const handlePaging = (e, incominPage) => {
    setPage(incominPage);

    return page;
  };

  const [loggedUser, setLoggedUser] = useState("");

  const [newTodo, setNewTodo] = useState({
    toDoName: "",
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

      let getUserInfo = userz.filter(
        (user) => user.userName == tempData.userName
      );

      console.log("When new username is av..");
      console.log(getUserInfo);

      //? Check if the user trying to log- in or registerin'
      if (page == "Register") {
        //TODO: Check if the username is available.
        if (getUserInfo.length == 0) {
          console.log("mor yazma");

          console.log("TempData");
          console.log(tempData);

          const newUser = async () => {
            const refRegister = await addDoc(userzCollection, tempData);
          };

          newUser();
        } else {
          console.log("%cThis username is taken.", "color: orange");
        }
      } else if (page == "Login") {
        // getUserInfo.length > 0
        //   ? getUserInfo[0].passWord == tempData.passWord
        //     ? console.log("%cLogin succesful..", "color: orange")
        //     : console.log("%cPassword is wrong.", "color: orange")
        //   : console.log("%cUser not found..", "color: orange");

        if (getUserInfo.length > 0) {
          if (getUserInfo[0].passWord == tempData.passWord) {
            console.log("%cLogin succesful..", "color: orange");
            setLoggedUser(getUserInfo[0]);
            setPage("Dashboard");
          } else {
            console.log("%cPassword is wrong.", "color: orange");
          }
        } else {
          console.log("%cUser not found..", "color: orange");
        }
      }

      e.target.parentElement.reset();
    }
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
      {page == "Dashboard" && <Dashboard loggedUser={loggedUser} />}
    </>
  );
}
