export default function UserCard(props) {
  const { daUserz, handleDelete } = props;

  let elementz = daUserz.map((f) => {
    return (
      <div className="card" key={f.id}>
        <h2>{f.userName}</h2>
        <div className="title title--epic">{f.passWord}</div>
        <div className="desc">ID: {f.id}</div>
        <img
          src="../src/assets/wTxOJSPL_400x400.jpg"
          style={{ width: "200px" }}
        />
        <div className="actions">
          <button className="actions__like">
            like &nbsp; <i className="fas fa-heart"></i>{" "}
          </button>
          <button
            className="actions__trade"
            onClick={(e) => handleDelete(e, f.id)}
          >
            Delete &nbsp; <i className="fas fa-exchange-alt"></i>{" "}
          </button>
          <button className="actions__cancel">
            close &nbsp; <i className="fas fa-times"></i>{" "}
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="container">{elementz}</div>
    </>
  );
}
