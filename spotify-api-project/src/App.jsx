import { useState, useEffect } from "react";
import { userzCollection, db } from "./Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";

import "./Second.css";

export default function App() {
  const [tempUserData, setTempUserData] = useState({
    userName: "",
    passWord: "",
  });

  const [modal, setModal] = useState({
    isShow: false,
    information: "defInfo",
    userName: "defUser",
  });

  const [currentPage, setCurrentPage] = useState("Login");

  //! DATABASE PROCESSES //
  const [allUserz, setAllUserz] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(userzCollection, (snapshot) => {
      snapshot.docs.length == 0
        ? console.log("%cDatabase is empty now..", "color: orange")
        : console.log("%cDatabase is changing..", "color: orange");

      console.log(
        `At total there are ${snapshot.docs.length} userz in the database..`
      );
      //? oldschool controllin to database changes

      //! READING:
      const userzArr = snapshot.docs.map((doc) => {
        //?Map returns array.. key point!
        return { id: doc.id, ...doc.data() };
      });

      setAllUserz(userzArr);
    });

    return unsubscribe;
    //? When onSnapshot is done with it' s shit its make it over to watch
    //? for encounter the memory leak
  }, []);

  const registerUser = async () => {
    const newUserRef = await addDoc(userzCollection, tempUserData); //? Getting the reference of the process.
  };

  //! -------------- //

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUserEnter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();

      let findUser = allUserz.filter(
        (user) => user.userName == tempUserData.userName
      );

      switch (currentPage) {
        case "Register":
          if (findUser.length == 0) {
            registerUser();
            setModal((prev) => {
              return {
                ...prev,
                isShow: true,
                information: "Register completed. Now you can log- in.",
                userName: tempUserData.userName,
              };
            });
          } else {
            setModal((prev) => {
              return {
                ...prev,
                isShow: true,
                information: "This username is taken.",
                userName: tempUserData.userName,
              };
            });
          }
          break;

        case "Login":
          if (findUser.length > 0) {
            if (findUser[0].passWord == tempUserData.passWord) {
              setLoggedUser(findUser);
              setCurrentPage("Dashboard");
            } else {
              setModal((prev) => {
                return {
                  ...prev,
                  isShow: true,
                  information: "Password is wrong",
                  userName: tempUserData.userName,
                };
              });
            }
          } else {
            setModal((prev) => {
              return {
                ...prev,
                isShow: true,
                information: "User not found.",
                userName: tempUserData.userName,
              };
            });
          }
      }
    }
  };

  const handlePaging = (e, pageName) => {
    setModal((prev) => {
      return {
        ...prev,
        isShow: false,
      };
    });
    setCurrentPage(pageName);
  };

  return (
    <>
      {currentPage == "Login" && (
        <Login
          modal={modal}
          setModal={setModal}
          currentPage={currentPage}
          handlePaging={handlePaging}
          handleInputChange={handleInputChange}
          handleUserEnter={handleUserEnter}
        />
      )}
      {currentPage == "Register" && (
        <Register
          modal={modal}
          setModal={setModal}
          currentPage={currentPage}
          handlePaging={handlePaging}
          handleInputChange={handleInputChange}
          handleUserEnter={handleUserEnter}
        />
      )}
      {currentPage == "Dashboard" && <Dashboard loggedUser={loggedUser} />}
    </>
  );
}
