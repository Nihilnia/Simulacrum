import "./register.css";

export default function Register(props) {
  document.body.classList.remove("body--login");
  document.body.classList.add("body--register");

  const { handleChange, handleSubmit, handlePaging } = props;

  return (
    <>
      <div className="background--register">
        <div className="shape--register"></div>
        <div className="shape--register"></div>
      </div>
      <form className="form--register" onKeyPress={(e) => handleSubmit(e)}>
        <h3>Register Here</h3>

        <label htmlFor="username" className="label--register">
          Username
        </label>
        <input
          className="input--register"
          placeholder="Username"
          type="text"
          name="userName"
          onChange={handleChange}
        />

        <label htmlFor="password" className="label--register">
          Password
        </label>
        <input
          className="input--register"
          placeholder="Password"
          type="password"
          name="passWord"
          onChange={handleChange}
        />

        <button className="button--register">Register</button>
        <a onClick={(e) => handlePaging(e, "Register")}>Back to login!</a>
      </form>
    </>
  );
}
