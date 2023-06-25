import Modal from "../Modal/Modal";

import "./login.css";

export default function Login(props) {
  document.body.classList.remove("body--register");
  document.body.classList.add("body--login");

  const {
    handleInputChange,
    handleUserLogin,
    handlePaging,
    showModal,
    setShowModal,
  } = props;

  // console.log("Modal is:" + showModal);

  return (
    <>
      {showModal.isShow && (
        <Modal showModal={showModal} setShowModal={setShowModal} />
      )}
      <div className="background--login">
        <div className="shape--login"></div>
        <div className="shape--login"></div>
      </div>
      <form className="form--login" onKeyPress={(e) => handleUserLogin(e)}>
        <h3>Login Here</h3>

        <label htmlFor="username" className="label--login">
          Username
        </label>
        <input
          className="input--login"
          placeholder="Username"
          type="text"
          name="userName"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password" className="label--login">
          Password
        </label>
        <input
          className="input--login"
          placeholder="Password"
          type="password"
          name="passWord"
          onChange={handleInputChange}
          required
        />

        <button className="button--login" onClick={(e) => handleUserLogin(e)}>
          Log In
        </button>
        <a
          style={{ color: "aliceblue" }}
          onClick={(e) => {
            handlePaging(e, "Register");
          }}
        >
          Need acc? Register here!
        </a>
      </form>
    </>
  );
}
