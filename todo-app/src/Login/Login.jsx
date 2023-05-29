import styles from "./login.module.css";

export default function Login(props) {
  const { handleChange, handleSubmit, handlePaging } = props;

  return (
    <>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form onKeyPress={(e) => handleSubmit(e)}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          placeholder="Username"
          type="text"
          name="userName"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          placeholder="Password"
          type="password"
          name="passWord"
          onChange={handleChange}
        />

        <button style={{ color: "aliceblue" }}>Log In</button>
        <a onClick={(e) => handlePaging(e, "Register")}>
          Need acc? Register here!
        </a>
      </form>
    </>
  );
}
