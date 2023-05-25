export default function Form(props) {
  const { handleEnter, handleChange, currentUserz } = props;

  let userz = currentUserz.map((f) => (
    <div key={f.id} style={{ border: "1px solid gray" }}>
      <span>
        ID: {f.id}- Username: {f.userName}
        <br />
        Password: {f.passWord}
      </span>
    </div>
  ));

  return (
    <>
      <div className="container">
        <form onKeyPress={handleEnter}>
          <p>Welcome</p>
          <input
            type="text"
            placeholder="Username"
            name="userName"
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="passWord"
            onChange={handleChange}
          />
          <br />
          <input type="button" value="Register" />
          <br />
        </form>

        <div className="drops">
          <div className="drop drop-1"></div>
          <div className="drop drop-2"></div>
          <div className="drop drop-3"></div>
          <div className="drop drop-4"></div>
          <div className="drop drop-5"></div>
        </div>
        {currentUserz.length > 0 && <h4>Registered Userz</h4>}
        {userz}
      </div>
    </>
  );
}
