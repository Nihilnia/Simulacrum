export default function GlassCard(props) {
  const { daUserz, handleDelete, handleUpdate } = props;

  let elementz = daUserz.map((f) => {
    return (
      <>
        <div className="grid-item" key={f.id}>
          <div className="container">
            <div className="wrapper">
              <div className="banner-image"> </div>
              <h1> {f.userName} </h1>
              <p>
                Password: {f.passWord} <br />
              </p>
            </div>
            <div className="button-wrapper">
              <button
                className="btn outline"
                onClick={(e) => handleDelete(e, f.id)}
              >
                Delete
              </button>
              <button
                className="btn outline"
                onClick={(e) => handleUpdate(e, f.id)}
              >
                Update
              </button>
              <br />
              <br />
              <button className="btn fill">ID: {f.id}</button>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="grid-container">{elementz}</div>
    </>
  );
}
