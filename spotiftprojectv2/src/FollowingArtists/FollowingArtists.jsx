import { useEffect, useState } from "react";
import { db, followingArtistzCollection } from "../Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

// import "./FollowingArtists.css";
import "../ArtistCard/ArtistCard2.css";
import "../Dashboard/Dashboard.css";
import ProfileV2 from "../Profile/ProfileV2";

import defArtistPic from "../ArtistCard/defArtist.png";

export default function FollowingArtists(props) {
  console.log("asd");
  document.body.classList.remove("body--login");
  document.body.classList.add("gradient-background");
  document.body.classList.add("body--newTodo");
  document
    .querySelector(".loading--after")
    .classList.add("visibilityHidden", "visibilityVisible");

  const { loggedUser, handlePaging, profileIntel } = props;
  console.log(loggedUser);

  const [allFollowingArtistz, setAllFollowingArtistz] = useState(null);

  //Profile popUp
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(followingArtistzCollection, (snapshot) => {
      snapshot.docs.length == 0
        ? console.log("%cDatabase is empty now..", "color: orange")
        : console.log("%cDatabase is changing..", "color: orange");

      //! READING:
      const userzFollowingArtistz = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      console.log("ARTISTTTSS");
      console.log(userzFollowingArtistz);

      setAllFollowingArtistz(userzFollowingArtistz);
    });

    return unsubscribe;
    //? When onSnapshot is done with it' s shit its make it over to watch
    //? for encounter the memory leak
  }, []);

  const handleUnfollowArtist = async (e, id) => {
    console.log("Incomin' collection id");
    console.log(id);
    const docRef = doc(db, "followingArtistz", id); //? Selectin' the doc we want to delete
    await deleteDoc(docRef); //? Give the reference to delete
  };

  console.log("AAAAAAAAAAAAAAAAAA");
  console.log(allFollowingArtistz);

  let followingArtistz = allFollowingArtistz?.filter(
    (f) => f.userID == loggedUser.id
  );

  console.log(followingArtistz);

  let toRender = followingArtistz?.map((artist) => {
    let adjustGenrez = "";
    if (artist.artistGenrez.length > 0) {
      for (let f = 0; f < artist.artistGenrez.length; f++) {
        adjustGenrez += artist.artistGenrez[f] + " ";
      }
    } else {
      adjustGenrez = "Unknown";
    }
    return (
      <>
        <div className="grid-item">
          <article
            style={{ width: "244.8px" }}
            className="card card--1 makeItBlack"
            // onClick={() => {
            //   window.open(artist.artistSpotifyLink, "_blank");
            // }}
          >
            <div className="card__info-hover">
              <svg className="card__like" viewBox="0 0 24 24">
                <path
                  fill="#000000"
                  d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
                />
              </svg>
              <div className="card__clock-info">
                <svg className="card__clock" viewBox="0 0 24 24">
                  <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                </svg>
                <span className="card__time">
                  {artist.artistFollowerCount > 0
                    ? artist.artistFollowerCount
                    : 0}
                </span>
              </div>
            </div>
            <div
              className="card__img"
              style={{
                backgroundImage: `url(${
                  artist.artistPic != undefined ? artist.artistPic : ""
                })`,
              }}
            ></div>
            <a href="#" className="card_link">
              <div
                className="card__img--hover"
                style={{
                  backgroundImage: `url(${
                    artist.artistPic != undefined ? artist.artistPic : ""
                  })`,
                }}
              ></div>
            </a>
            <div className="card__info">
              <span className="card__category"> {artist.artistName}</span>
              <h3 className="card__title"></h3>
              <span className="card__by">
                Genres:{" "}
                <a href="#" className="card__author" title="author">
                  {artist.artistGenrez.length > 0
                    ? adjustGenrez.length > 20
                      ? adjustGenrez.slice(0, 17) + "..."
                      : adjustGenrez
                    : "Unknown"}
                </a>
              </span>
              <br />
              <span className="card__by">
                Popularity:{" "}
                <a href="#" className="card__author" title="author">
                  {`${artist.artistPopularity}/ 100`}
                </a>
                {/* CHECKIN' IF THE USER ALREADY FOLLOWIN' */}
                {/* //Already following */}
                <>
                  <br />
                  <svg
                    onClick={(e) => {
                      console.log("User requested to unfollow the artist:");
                      console.log(artist);
                      handleUnfollowArtist(e, artist.id);
                    }}
                    style={{
                      marginTop: "2px",
                      color: "#C88413",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  <span style={{ marginLeft: "2px" }}>Following</span>
                </>
              </span>
            </div>
          </article>
        </div>
      </>
    );
  });

  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navBar").style.top = "20px";
    } else {
      document.getElementById("navBar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
  };
  return (
    <>
      {isProfile && (
        <ProfileV2 profileIntel={profileIntel} toggleProfile={setIsProfile} />
      )}
      <div className="loading--after visibilityHidden">
        <div className="navbar--back"></div>
        <nav className="childNav" id="navBar">
          <a onClick={(e) => handlePaging(e, "Dashboard")}>
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
          <a onClick={(e) => handlePaging(e, "Followin' Artists")}>
            Your Artists&nbsp;
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
          <a onClick={(e) => handlePaging(e, "Followin' Songs")}>
            Your Songs&nbsp;
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
          <a onClick={(e) => handlePaging(e, "Followin' Playlists")}>
            Your Playlists&nbsp;
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
          <a
            onClick={(e) => {
              setIsProfile((prev) => !prev);
            }}
          >
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
        <h2 className="user--header">
          You' re followin {followingArtistz?.length} artist
        </h2>

        {/* //HERE */}
        {/* <section>
          <div className="container">
            <div className="row">
              <div className="col">
                <ul className="cards">{toRender}</ul>
              </div>
            </div>
          </div>
        </section> */}

        <div className="grid-container" style={{ marginTop: "20px" }}>
          {toRender}
        </div>
      </div>
    </>
  );
}
