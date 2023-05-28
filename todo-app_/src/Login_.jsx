export default function Login(props) {
  const { handleChange, handleEnter, allUserz } = props;

  let elementUserz = allUserz.map((user) => {
    return (
      <>
        <h3 key={user.id}>
          ID: {user.id} _ userName: {user.userName} _ passWord: {user.passWord}
        </h3>
      </>
    );
  });

  return (
    <>
      <form onKeyPress={handleEnter}>
        <input
          placeholder="Username"
          type="text"
          name="userName"
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          type="password"
          name="passWord"
          onChange={handleChange}
        />
      </form>
      {elementUserz.length > 0 && elementUserz}
    </>
  );
}
