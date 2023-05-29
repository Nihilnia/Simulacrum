import styles from "./register.module.css";

export default function Register(props) {
  const { handleChange, handleSubmit, handlePaging } = props;

  return (
    <>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form onKeyPress={(e) => handleSubmit(e)}>
        <h3>Register Here</h3>
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
        <button style={{ color: "aliceblue" }}>Register</button>
        <a onClick={(e) => handlePaging(e, "Login")}>Back to Login</a>
      </form>
    </>
  );
}
