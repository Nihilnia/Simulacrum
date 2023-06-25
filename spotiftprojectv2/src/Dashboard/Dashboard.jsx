import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

// import Profile from "../Profile/Profile";
import "../Dashboard/Dashboard.css";
import "../ArtistCard/ArtistCard.css";

import defArtistPic from "../ArtistCard/defArtist.png";

const clientID = "4417abaf1e184e449cf0d5a9feab5e49";
const clientSecret = "e319dae8583c44dc85b3cc12989ae5fa";

export default function Dashboard(props) {
  document.body.classList.remove("body--login");
  document.body.classList.add("gradient-background");
  document.body.classList.add("body--newTodo");

  const { loggedUser } = props;

  const [accessToken, setAccessToken] = useState("");
  const [artists, setArtist] = useState([]);

  const [userChoice, setUserChoice] = useState({
    userName: loggedUser.userName,
    Page: "Dashboard",
    intel: "",
  });

  const authParamz = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
  };

  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", authParamz)
      .then((resp) => resp.json())
      .then((data) => setAccessToken(data.access_token));

    // const unsubscribe = onSnapshot(followingArtistzCollection, (snapshot) => {

    //   //! READING:
    //   const followingArtistzArr = snapshot.docs.map((doc) => {
    //     //?Map returns array.. key point!
    //     return { id: doc.id, ...doc.data() };
    //   });

    //   let artistzArr = followingArtistzArr.filter(
    //     (FA) => FA.userID == loggedUser[0].id
    //   );

    //   setFollowingArtistz(artistzArr);
    // });

    // return unsubscribe;
  }, []);

  console.log(artists);

  const searchWithArtist = async (e, searchArtist) => {
    const artistParamz = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    //? GET THE ARTIST ID
    let artistID = await fetch(
      `https://api.spotify.com/v1/search?q=${searchArtist}&type=artist`,
      artistParamz
    )
      .then((response) => response.json())
      .then((data) =>
        setArtist(() => {
          return data.artists.items;
        })
      );

    //? GET THE SONGS/ ALBUMS ETC. OF THE ARTIST

    //? When onSnapshot is done with it' s shit its make it over to watch
    //? for encounter the memory leak
  };
  //     toRender = followingArtistz.map((artist) => {
  //       return (
  //         <>
  //           <li>
  //             <a className="card">
  //               <img src={artist.artistImage} className="card__image" alt="" />
  //               <div className="card__overlay">
  //                 <div className="card__header">
  //                   <svg
  //                     className="card__arc"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                   >
  //                     <path />
  //                   </svg>
  //                   <img
  //                     className="card__thumb"
  //                     src={artist.artistImage}
  //                     alt=""
  //                   />
  //                   <div className="card__header-text">
  //                     <h3 className="card__title">{artist.artistName}</h3>
  //                     <span className="card__status">
  //                       {artist.artistFollowerz > 0
  //                         ? artist.artistFollowerz + " Followers"
  //                         : "This artist has no followers."}
  //                     </span>
  //                     <br />
  //                     <span className="card__status">
  //                       {artist.artistGenrez.length > 0
  //                         ? artist.artistGenrez
  //                         : "Unknown genres."}
  //                     </span>
  //                   </div>
  //                 </div>
  //                 <p className="card__description">
  //                   <button
  //                     type="button"
  //                     className="btn btn-dark"
  //                     onClick={(e) => handleUnfollowArtist(e, artist.id)}
  //                   >
  //                     <svg
  //                       xmlns="http://www.w3.org/2000/svg"
  //                       width="16"
  //                       height="16"
  //                       fill="currentColor"
  //                       className="bi bi-person-plus-fill"
  //                       viewBox="0 0 16 16"
  //                     >
  //                       <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  //                       <path
  //                         fillRule="evenodd"
  //                         d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
  //                       />
  //                     </svg>
  //                     &nbsp; Unfollow the artist
  //                   </button>
  //                 </p>
  //               </div>
  //             </a>
  //           </li>
  //         </>
  //       );
  //     });
  // }};

  let toRender = null;

  switch (userChoice.Page) {
    case "Dashboard":
      toRender = artists.map((artist) => {
        return (
          <>
            <li>
              <a className="card">
                <img
                  src={
                    artist.images[0] != null
                      ? artist.images[0].url
                      : defArtistPic
                  }
                  className="card__image"
                  alt=""
                />
                <div className="card__overlay">
                  <div className="card__header">
                    <svg
                      className="card__arc"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path />
                    </svg>
                    <img
                      className="card__thumb"
                      src={
                        artist.images[0] != null
                          ? artist.images[0].url
                          : defArtistPic
                      }
                      alt=""
                    />
                    <div className="card__header-text">
                      <h3 className="card__title">{artist.name}</h3>
                      <span className="card__status">
                        {artist.followers.total > 0
                          ? artist.followers.total + " Followers"
                          : "This artist has no followers."}
                      </span>
                      <br />
                      <span className="card__status">
                        {artist.genres.length > 0
                          ? artist.genres
                          : "Unknown genres."}
                      </span>
                    </div>
                  </div>
                  <p className="card__description">
                    <button type="button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-plus-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path
                          fillRule="evenodd"
                          d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                        />
                      </svg>
                      &nbsp; Follow
                    </button>
                  </p>
                </div>
              </a>
            </li>
          </>
        );
      });
      break;
  }

  return (
    <>
      <div className="loading--container">
        <div className="loading--loading-bar">
          <div className="loading--loading-bar--progress">
            <span className="loading--first"></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span className="loading--last"></span>
          </div>
        </div>
      </div>
      {setTimeout(() => {
        document
          .querySelector(".loading--container")
          .classList.add("loading--hide");
        document
          .querySelector(".loading--after")
          .classList.add("visibilityHidden", "visibilityVisible");
      }, 3000)}
      <div className="loading--after visibilityHidden gradient-background">
        <div className="navbar--back"></div>
        <nav>
          <a>
            {/* <img src="../src/assets/homePage.svg" className="navBar--icon" /> */}
            Dashboard&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-house-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
            </svg>
          </a>
          &nbsp;|&nbsp;
          <a>
            Followin' Artists&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-file-earmark-music-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 6.64v1.75l-2 .5v3.61c0 .495-.301.883-.662 1.123C7.974 13.866 7.499 14 7 14c-.5 0-.974-.134-1.338-.377-.36-.24-.662-.628-.662-1.123s.301-.883.662-1.123C6.026 11.134 6.501 11 7 11c.356 0 .7.068 1 .196V6.89a1 1 0 0 1 .757-.97l1-.25A1 1 0 0 1 11 6.64z" />
            </svg>
          </a>
          &nbsp;|&nbsp;
          {/* <a>
          Completed&nbsp;&nbsp;<i className="fa-solid fa-check fa-lg"></i>
        </a>
        &nbsp;|&nbsp; */}
          <a>
            Profile&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
          </a>
          &nbsp;|&nbsp;
          <a href="/">
            Logout&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-up-right-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z" />
            </svg>
          </a>
        </nav>
        <h2 className="user--header">Welcome {loggedUser.userName}</h2>
        <form>
          <input type="text" name="artistName" id="artistName" />
          <button
            onClick={(e) => {
              e.preventDefault();
              let inpValue = document.querySelector("#artistName").value;
              searchWithArtist(e, inpValue);
            }}
          >
            Search
          </button>
          {/* <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Search for artists</label>
          </div> */}
        </form>

        <section>
          <div className="container">
            <div className="row">
              <div className="col">
                <ul className="cards">{toRender}</ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
