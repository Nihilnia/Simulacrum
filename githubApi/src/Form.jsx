export default function Form(props) {
  const { handleEnter, handleChange, currentUserz, handleDelete } = props;

  let userz = currentUserz.map((f) => (
    <tr key={f.id}>
      <td>
        <a href={f.avatar_url}>
          <img src={f.avatar_url} style={{ width: "25%" }} />
        </a>
      </td>
      <td>{f.login}</td>
      <td>ID: {f.id} </td>
      <td>
        <a href={f.html_url}>{f.html_url}</a>
      </td>
      <td>
        <button onClick={handleDelete} name={f.id}>
          X
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="container">
        <form onSubmit={handleEnter}>
          <p>Welcome</p>
          <input
            required
            type="text"
            placeholder="Username"
            name="userName"
            onChange={handleChange}
          />
          <br />
          <input type="submit" value="Get User" />
          <br />
        </form>

        <div className="drops">
          <div className="drop drop-1"></div>
          <div className="drop drop-2"></div>
          <div className="drop drop-3"></div>
          <div className="drop drop-4"></div>
          <div className="drop drop-5"></div>
        </div>
      </div>
      <section>
        <div className="tbl-header">
          <table border="0">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Username</th>
                <th>ID</th>
                <th>Link</th>
                <th>Remove</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table border="0">
            <tbody>{userz}</tbody>
          </table>
        </div>
      </section>
    </>
  );
}
