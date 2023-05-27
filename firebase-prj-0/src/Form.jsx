export default function Register(props) {
  const { handleSubmit, handleChange } = props;

  return (
    <>
      <form onKeyPress={handleSubmit} style={{ alignItems: "center" }}>
        <input
          type="text"
          name="userName"
          placeholder="Username.."
          onChange={handleChange}
        />
        <input
          type="password"
          name="passWord"
          placeholder="Password.."
          onChange={handleChange}
        />
      </form>
    </>
  );
}
