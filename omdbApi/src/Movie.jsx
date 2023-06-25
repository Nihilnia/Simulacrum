export default function GetMovie(props) {
  const { objMovie, getNewMovie, handleChange } = props;

  let elementz = objMovie.map((f) => (
    <>
      <div id="movie-card-list">
        <div
          className="movie-card"
          style={{ backgroundImage: `url("${f.Poster}")` }}
        >
          <div className="color-overlay">
            <div className="movie-share">
              {/* <a className="movie-share__icon" href="#">
                <i className="material-icons">Metascrore: {f.Metascore}</i>
              </a> */}
              {/* <a className="movie-share__icon" href="#">
                <i className="material-icons">
                  &#11088;Metascrore: {f.Metascore}
                </i>
              </a> */}
              {/* <a className="movie-share__icon" href="#">
                <i className="material-icons">Metascrore: {f.Metascore}</i>
              </a> */}
            </div>
            <div className="movie-content">
              <div className="movie-header">
                <h1 className="movie-title">{f.Title}</h1>
                <h4 className="movie-info">
                  ({f.Year}) {f.Genre}
                </h4>
              </div>
              <p className="movie-desc">{f.Plot}</p>
              <p className="movie-desc">
                Director: {f.Director}
                <br />
                <hr />
                Writer: {f.Writer}
                <br />
                <hr />
                Actors: {f.Actors}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  ));

  return (
    <>
      <div className="container">
        <div className="left">
          <div className="header"></div>
          <div className="form">
            <h2 className="animation a1">Search for the movie</h2>
            <input
              type="text"
              className="form-field animation a3"
              placeholder="Movie name"
              name="movieName"
              onChange={handleChange}
            />

            {/* <p className="animation a5">
              <a href="#">Forgot Password</a>
            </p> */}
            <button
              className="animation a6"
              type="submit"
              onClick={getNewMovie}
            >
              Search
            </button>
          </div>
        </div>
        {elementz}
        <button
          style={{ width: "200px", height: "400px" }}
          onClick={() => localStorage.removeItem("moviez")}
        >
          Remove movies
        </button>
      </div>
    </>
  );
}
