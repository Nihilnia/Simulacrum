export default function Login(props) {
  const { handleChange, handleEnter, allUserz } = props;

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onKeyPress={handleEnter}>
        <h3>Login Here</h3>
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="userName"
          onChange={handleChange}
        />
        <label htmlFor="passWord">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="passWord"
          onChange={handleChange}
        />
        <input type="send" placeholder="Login" className="inpSend" />
      </form>
    </>
  );
}
