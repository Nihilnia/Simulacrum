import "./login.css";

export default function Login(props) {
  document.body.classList.remove("body--register");
  document.body.classList.add("body--login");

  const { handleChange, handleSubmit, handlePaging } = props;

  return (
    <>
      <div className="background--login">
        <div className="shape--login"></div>
        <div className="shape--login"></div>
      </div>
      <form className="form--login" onKeyPress={(e) => handleSubmit(e)}>
        <h3>Login Here</h3>

        <label htmlFor="username" className="label--login">
          Username
        </label>
        <input
          className="input--login"
          placeholder="Username"
          type="text"
          name="userName"
          onChange={handleChange}
        />

        <label htmlFor="password" className="label--login">
          Password
        </label>
        <input
          className="input--login"
          placeholder="Password"
          type="password"
          name="passWord"
          onChange={handleChange}
        />

        <button className="button--login">Log In</button>
        <a onClick={(e) => handlePaging(e, "Register")}>
          Need acc? Register here!
        </a>
      </form>
    </>
  );
}
