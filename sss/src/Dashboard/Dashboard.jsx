import { useEffect, useState } from "react";
import { db, followingArtistCollection } from "../Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

import Profile from "../Profile/Profile";
import "../Dashboard/Dashboard.css";

const clientID = "4417abaf1e184e449cf0d5a9feab5e49";
const clientSecret = "e319dae8583c44dc85b3cc12989ae5fa";

export default function Dashboard(props) {
  document.body.classList.remove("body--login");
  document.body.classList.add("gradient-background");
  document.body.classList.add("body--newTodo");

  const { loggedUser } = props;

  console.log("LOGGED USER");
  console.log(loggedUser);

  const [accessToken, setAccessToken] = useState("");
  const [artists, setArtist] = useState([]);
  const authParamz = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
  };

  //? USERZ LISTS
  const [followingArtists, setFollowingArtist] = useState(null);

  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", authParamz)
      .then((resp) => resp.json())
      .then((data) => setAccessToken(data.access_token));

    // const unsubscribe = onSnapshot(followingArtistCollection, (snapshot) => {

    //   //! READING:
    //   const userzArr = snapshot.docs.map((doc) => {
    //     //?Map returns array.. key point!
    //     return { id: doc.id, ...doc.data() };
    //   });
    // });

    // return unsubscribe;
  }, []);

  const searchWithArtist = async (e, searchArtist) => {
    console.log("user searched for:");
    console.log(searchArtist);

    const artistParamz = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    console.log(artists);

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
  };

  const requestFollowArtist = (e, artistID, artistName) => {
    //? Getting the reference of the process.

    console.log(`User: ${loggedUser.userName} wanted to follow
      Artist ID: ${artistID}
      Artist Name: ${artistName}
    `);

    const followArtist = async () => {
      const newFollowinArtistRef = await addDoc(followingArtistCollection, {
        userID: loggedUser.userID,
        userName: loggedUser.userName,
        artistID: artistID,
        artistName: artistName,
      });
    };

    console.log(followinData);
    followArtist();
  };

  let daObj = artists.map((artist) => {
    return {
      name: artist.name,
      ID: artist.id,
      genrez: artist.genres, //map over it
      followerz: artist.followers.total, //might have problem wth with way
      picz: artist.images.length > 0 ? artist.images : null, //foreach
      external_urlz: artist.external_urls,
    };
  });

  let elementArtist = daObj.map((f) => {
    let daImageURL = "";
    if (f.picz != null) {
      f.picz.forEach((image) => {
        if (image.height == 640) daImageURL += image.url;
      });
    } else {
      daImageURL = "../src/assets/defArtist.png";
    }

    return (
      <>
        <div className="jelly-card">
          <div className="card py-3 ">
            <div className="row">
              <div className="col-10 col-md-4 col-lg-3 jelly-bloc text-center text-md-start">
                <img
                  src={daImageURL}
                  className="card-img-top card-pic slowfloat2s"
                />
              </div>
              <div className="col-12 col-md-8 col-lg-8">
                <div className="card-body">
                  <h5 className="card-title">{f.name}</h5>
                  <div className="line"></div>
                  <p className="card-text">{f.genrez}</p>
                  <i
                    class="fa-solid fa-headphones fa-lg"
                    style={{ fontSize: "15px" }}
                  >
                    {" "}
                    Followers
                  </i>
                  <p className="card-text">{f.followerz}</p>
                  <a href={f.external_urlz["spotify"]}>Artist' profile</a>

                  <i
                    class="fa-solid fa-plus bringTheNoise"
                    onClick={(e) => requestFollowArtist(e, f.ID, f.name)}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
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
            Search&nbsp;&nbsp;
            <i className="fa-solid fa-list-check fa-lg"></i>
          </a>
          &nbsp;|&nbsp;
          <a>
            Followin' Artists&nbsp;&nbsp;
            <i className="fa-brands fa-phoenix-framework fa-lg"></i>
          </a>
          &nbsp;|&nbsp;
          <a>
            Completed&nbsp;&nbsp;<i className="fa-solid fa-check fa-lg"></i>
          </a>
          &nbsp;|&nbsp;
          <a>
            Profile&nbsp;&nbsp;<i className="fa-solid fa-user fa-lg"></i>
          </a>
          &nbsp;|&nbsp;
          <a href="/">
            Logout <i className="fa-solid fa-power-off fa-lg"></i>
          </a>
        </nav>
        <h2 className="user--header">Welcome: {loggedUser.userName}</h2>
        <form>
          <input type="text" name="artistName" id="artistName" />
          <button
            onClick={(e) => {
              e.preventDefault();
              let inpValue = document.querySelector("#artistName").value;
              searchWithArtist(e, inpValue);
            }}
          >
            AAAAAAAAAA
          </button>
        </form>

        <section className="">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-8 col-md-6">
                {elementArtist != null && elementArtist}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
