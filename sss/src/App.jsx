import { userzCollection, db } from "./Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

import { useState } from "react";
import "./Second.css";
import { useEffect } from "react";

import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  const [userInput, setUserInput] = useState("");

  let [customData, setCustomData] = useState([]);

  //FIREBASE PROCESSES
  const [ls, setLS] = useState(
    JSON.parse(localStorage.getItem("spotifyApiProject")) || []
  );
  const [tempUserData, setTempUserData] = useState({
    userID: "",
    userName: "",
    passWord: "",
  });

  const [allUserz, setAllUserz] = useState({
    id: 0,
    userName: "",
    passWord: "",
  });

  const [pageName, setPageName] = useState("Login");

  const [showModal, setShowModal] = useState({
    isShow: false,
    information: "WRONG MF.",
  });

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

      console.log(userzArr);

      setAllUserz(userzArr);

      //?When data is deleted on db, even with hand localStorage getting empty
      setLS(() => {
        localStorage.setItem("spotifyApiProject", JSON.stringify(userzArr));
      });
    });

    return unsubscribe;
    //? When onSnapshot is done with it' s shit its make it over to watch
    //? for encounter the memory leak
  }, []);

  function handleEnterSearch(e) {
    console.log("asd");

    if (e.key == "Enter") {
      e.preventDefault();
    }
  }

  function handlePaging(e, incominPageName) {
    setShowModal(() => {
      return { isShow: false, information: "" };
    });
    setPageName(() => incominPageName);
  }

  //! USER LOGIN CONTROL- WHEN ENTER PRESSED
  function handleUserLogin(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      console.log("%cUser pressed enter.", "color: orange");

      let findUser = allUserz.filter(
        (user) => user.userName == tempUserData.userName
      );

      switch (pageName) {
        case "Login":
          console.log("User trying to login.");

          //? USER LOGIN CONTROL
          if (findUser.length > 0) {
            console.log("Found user:");
            console.log(findUser);
            console.log(findUser[0]);
            //? IF USER LOGGED IN, GET THE ARTISTS THEN
            if (findUser[0].passWord == tempUserData.passWord) {
              console.log("Login successfuly.");
              setTempUserData((prev) => {
                return {
                  ...prev,
                  userID: findUser[0].id,
                };
              });
              setPageName("Dashboard");
            } else {
              console.log("Password is wrong..");
              setShowModal(() => {
                return {
                  isShow: true,
                  information: "Password is wrong..",
                  userName: tempUserData.userName,
                };
              });
            }
          } else {
            console.log("User not found.");
            setShowModal(() => {
              return {
                isShow: true,
                information: "User not found.",
                userName: tempUserData.userName,
              };
            });
          }
          break;

        case "Register":
          console.log("Page: " + pageName);
          console.log("User trying to register.");
          setShowModal(() => {
            if (findUser.length == 0) {
              const registerNewUser = async () => {
                const refNewUser = await addDoc(userzCollection, tempUserData);
              };
              registerNewUser();
              return {
                isShow: true,
                information: "Register completed. You can now log- in.",
                userName: tempUserData.userName,
              };
            } else {
              return {
                isShow: true,
                information: "This user is already exists.",
                userName: tempUserData.userName,
              };
            }
          });

          e.target.parentElement.reset();

          break;
      }
    }
  }

  function handleInputChange(e) {
    console.log("Login..");
    const { value, name } = e.target;
    setTempUserData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  console.log(tempUserData);

  //? PAGING
  console.log("Page: " + pageName);
  console.log("Showmodal: ");
  console.log(showModal);

  console.log("ABC");
  console.log(tempUserData);

  return (
    <>
      {pageName == "Dashboard" && <Dashboard loggedUser={tempUserData} />}
      {pageName == "Login" && (
        <Login
          handleInputChange={handleInputChange}
          handleUserLogin={handleUserLogin}
          handlePaging={handlePaging}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {pageName == "Register" && (
        <Register
          handleInputChange={handleInputChange}
          handleUserLogin={handleUserLogin}
          handlePaging={handlePaging}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
}

export default App;
