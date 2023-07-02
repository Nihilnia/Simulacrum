import { useEffect, useState } from "react";
import {
  db,
  followingArtistzCollection,
  followingSongzCollection,
  followingPlaylistzCollection,
} from "../Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import { Spotify } from "react-spotify-embed";

// import Profile from "../Profile/Profile";
import "../Dashboard/Dashboard.css";
import "../ArtistCard/ArtistCard2.css";

import defPP from "../Profile/defPP.jpg";
import defArtistPic from "../ArtistCard/defArtist.png";
import defTrackPic from "../ArtistCard/defTrack.png";
import defPlaylistPic from "../ArtistCard/defPlaylist.png";
import ProfileV2 from "../Profile/ProfileV2";

const clientID = "4417abaf1e184e449cf0d5a9feab5e49";
const clientSecret = "e319dae8583c44dc85b3cc12989ae5fa";

export default function Dashboard(props) {
  document.body.classList.remove("body--login");
  document.body.classList.add("gradient-background");
  document.body.classList.add("body--newTodo");

  // console.log(document.querySelector("#root"));

  const { loggedUser, fromPage, handlePaging, profileIntel, setProfileIntel } =
    props;

  const [accessToken, setAccessToken] = useState("");
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  //User' s collections
  const [userSongz, setUserSongz] = useState([]);
  const [userArtistz, setUserArtistz] = useState([]);
  const [userPlaylistz, setUserPlaylistz] = useState([]);

  //Profile popUp
  const [isProfile, setIsProfile] = useState(false);

  const [userChoice, setUserChoice] = useState({
    userName: loggedUser.userName,
    Page: "Dashboard",
    intel: "",
  });

  const [followingArtistz, setFollowingArtistz] = useState();

  useEffect(() => {
    const authParamz = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
    };

    fetch("https://accounts.spotify.com/api/token", authParamz)
      .then((resp) => resp.json())
      .then((data) => setAccessToken(data.access_token));

    //! USER' Z INTELZ
    const unsubscribe = onSnapshot(followingArtistzCollection, (snapshot) => {
      const userzFollowingArtistz = snapshot.docs.map((doc) => {
        //?Map returns array.. key point!
        return { id: doc.id, ...doc.data() };
      });

      setUserArtistz(
        userzFollowingArtistz.filter((f) => f.userID == loggedUser.id)
      );
    });

    const unsubscribe2 = onSnapshot(followingSongzCollection, (snapshot) => {
      const userzFollowingSongz = snapshot.docs.map((doc) => {
        //?Map returns array.. key point!
        return { id: doc.id, ...doc.data() };
      });

      setUserSongz(
        userzFollowingSongz.filter((f) => f.userID == loggedUser.id)
      );
    });

    const unsubscribe3 = onSnapshot(
      followingPlaylistzCollection,
      (snapshot) => {
        const userzFollowingPlaylistz = snapshot.docs.map((doc) => {
          //?Map returns array.. key point!
          return { id: doc.id, ...doc.data() };
        });

        setUserPlaylistz(
          userzFollowingPlaylistz.filter((f) => f.userID == loggedUser.id)
        );
      }
    );

    return unsubscribe, unsubscribe2, unsubscribe3;
  }, []);

  // console.log(artists);
  // console.log("User' following those artists");
  // console.log(userArtistz);
  // console.log("User' following those songs");
  // console.log(userSongz);
  // console.log("User' following those playlist");
  // console.log(userPlaylistz);

  const handleSpotifySearch = async (e, searchArtist) => {
    const artistParamz = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    //? GETTIN' ARTISTS
    await fetch(
      `https://api.spotify.com/v1/search?q=${searchArtist}&type=artist&limit=5`,
      artistParamz
    )
      .then((response) => response.json())
      .then((data) =>
        setArtists(() => {
          return data.artists.items;
        })
      );

    //? GET THE SONGS
    await fetch(
      `https://api.spotify.com/v1/search?q=${searchArtist}&type=track&limit=5`,
      artistParamz
    )
      .then((response) => response.json())
      .then((data) => {
        setTracks(() => {
          return data.tracks.items;
        });
      });

    //? TRY FOR USERS?
    // await fetch(
    //   `https://api.spotify.com/v1/users/${searchArtist}`,
    //   artistParamz
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   });

    await fetch(
      `https://api.spotify.com/v1/search?q=${searchArtist}&type=playlist&limit=3`,
      artistParamz
    )
      .then((response) => response.json())
      .then((data) =>
        setPlaylists(() => {
          return data.playlists.items;
        })
      );
    //? When onSnapshot is done with it' s shit its make it over to watch
    //? for encounter the memory leak

    setProfileIntel({
      userName: loggedUser.userName,
      intelSongz: userSongz,
      intelArtistz: userArtistz,
      intelPlaylistz: userPlaylistz,
    });
  };

  // console.log(document.querySelector("#root"));

  const handleFollowArtist = (e, incomingIntel) => {
    console.log(`User requested to follow the artist:`);
    console.log(incomingIntel);
    const followTheArtist = async () => {
      const followRef = await addDoc(followingArtistzCollection, incomingIntel); //? Getting the reference of the process.
    };

    followTheArtist();
  };

  const handleUnfollowArtist = async (e, id) => {
    console.log("Incomin'");
    console.log(id);
    console.log("collection");
    console.log(followingArtistzCollection);
    const docRef = doc(db, "followingArtistz", id);
    await deleteDoc(docRef);
  };

  const handleUnfollowSong = async (e, id) => {
    console.log(
      `User: ${loggedUser.userName} requested to follow the song with ID`
    );
    console.log(id);
    const docRef = doc(db, "followingSongz", id);
    await deleteDoc(docRef);
  };

  const handleUnfollowPlaylist = async (e, id) => {
    console.log(
      `User: ${loggedUser.userName} requested to follow the playlist with ID`
    );
    console.log(id);
    const docRef = doc(db, "followingPlaylistz", id);
    await deleteDoc(docRef);
  };

  const handleFollowSong = (e, incomingIntel) => {
    console.log(`User requested to follow the artist:`);
    console.log(incomingIntel);
    const followTheSong = async () => {
      const followRef = await addDoc(followingSongzCollection, incomingIntel); //? Getting the reference of the process.
    };

    followTheSong();
  };

  const handleFollowPlaylist = (e, incomingIntel) => {
    console.log(`User requested to follow the artist:`);
    console.log(incomingIntel);
    const followThePlaylist = async () => {
      const followRef = await addDoc(
        followingPlaylistzCollection,
        incomingIntel
      ); //? Getting the reference of the process.
    };

    followThePlaylist();
  };

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

  // console.log(`
  // ############# ITEMZ
  // `);

  // console.log(artists);
  // console.log(tracks);
  // console.log(playlists);

  //? Render Tracks
  let toRenderTracks = tracks.map((track) => {
    let isFollowing = userSongz.filter((f) => f.songID == track.id);

    const findIntel = userSongz.filter((f) => f.songID == track.id);

    // album.images[0].url
    // name
    // duration_ms
    // popularity
    // external_urls["spotify"]
    return (
      <article
        key={track.id}
        style={{ height: "241.8px !important" }}
        className={`card card--1 sTrack ${
          isFollowing.length > 0 ? "makeItBlack" : ""
        }`}
        // onClick={() => {
        //   window.open(track.external_urls["spotify"], "_blank");
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
              {track.duration_ms > 0
                ? `${new Date(track.duration_ms).getMinutes()}:${new Date(
                    track.duration_ms
                  ).getSeconds()} Minutes`
                : `Unknown`}
            </span>
          </div>
        </div>
        <div
          className="card__img"
          style={{ backgroundImage: `url(${track.album.images[0].url})` }}
        ></div>
        <a className="card_link">
          <div
            className="card__img--hover"
            style={{ backgroundImage: `url(${track.album.images[0].url})` }}
          ></div>
        </a>
        <div
          className="card__info"
          style={
            isFollowing.length > 0
              ? { backgroundColor: "#FFA726" }
              : { backgroundColor: "#fff" }
          }
        >
          <span className="card__category">
            {" "}
            {track.name.length > 21
              ? track.name.slice(0, 18) + "..."
              : track.name}
          </span>
          <h3 className="card__title"></h3>
          <span className="card__by">
            Artist:{" "}
            <a className="card__author" title="author">
              {track.artists[0]["name"]}
            </a>
            {/* songAlbumName
                "defAlbum"

                songArtistz
                "defArtistz"

                songID
                "333"

                songName
                "defSong"

                songPic
                "defPic"

                songPopularity
                "444"

                songReleaseDate
                "defDate"

                userID
                "666"

                userName
                "defUser" */}
            {/* <button
                onClick={(e) =>
                  handleFollowSong(e, {
                    userID: loggedUser.id,
                    userName: loggedUser.userName,
                    songReleaseData: track.album.release_date,
                    songPopularity: track.popularity,
                    songPic: track.album.images[0].url,
                    songName: track.name,
                    songID: track.id,
                    songArtistz: track.album.artists,
                    songAlbumName: track.album.name,
                  })
                }
              >
                Follow mf
              </button> */}
            <br />
            Release Date:{" "}
            <a className="card__author" title="author">
              {track.album.release_date}
            </a>
            {/* CHECKIN' IF THE USER ALREADY FOLLOWIN' */}
            {isFollowing.length > 0 ? (
              //Already following
              <>
                <br />
                <svg
                  onClick={(e) => {
                    handleUnfollowSong(e, findIntel[0].id);
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
            ) : (
              //Not following
              <>
                <br />
                <svg
                  onClick={(e) =>
                    handleFollowSong(e, {
                      userID: loggedUser.id,
                      userName: loggedUser.userName,
                      songReleaseData: track.album.release_date,
                      songPopularity: track.popularity,
                      songPic: track.album.images[0].url,
                      songName: track.name,
                      songID: track.id,
                      songArtistz: track.album.artists,
                      songAlbumName: track.album.name,
                    })
                  }
                  style={{
                    marginTop: "4px",
                    color: "#C88413",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-star"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>
                <span style={{ marginLeft: "2px" }}>Follow</span>
              </>
            )}
          </span>
        </div>
      </article>
    );
  });

  //? Render Tracks (iFrame)
  let toRenderTracksIFrame = tracks.map((track) => {
    return (
      <article
        key={track.id + "track"}
        className="card card--1"
        // onClick={() => {
        //   window.open(artist.external_urls["spotify"], "_blank");
        // }}
      >
        <Spotify wide link={track.external_urls["spotify"]} />
      </article>
    );
  });

  //? Render Artists
  let toRenderArtists = artists.map((artist) => {
    let isFollowing = userArtistz.filter((f) => f.artistID == artist.id);

    //Get the id of the collection
    let findIntel = userArtistz.filter((f) => f.artistID == artist.id);

    let adjustGenrez = "";
    if (artist.genres.length > 0) {
      for (let f = 0; f < artist.genres.length; f++) {
        adjustGenrez += artist.genres[f] + " ";
      }
    } else {
      adjustGenrez = "Unknown";
    }

    return (
      <article
        key={artist.id}
        className="card card--1"
        style={{ width: "251px !important", height: "383px !important" }}
        // onClick={() => {
        //   window.open(artist.external_urls["spotify"], "_blank");
        // }}
      >
        <div className="card__info-hover">
          <div className="card__clock-info">
            <svg className="card__clock" viewBox="0 0 24 24">
              <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
            </svg>
            <span className="card__time">
              {artist.followers["total"] > 0 ? artist.followers["total"] : 0}
              &nbsp;Followers
            </span>
          </div>
        </div>
        <div
          className="card__img"
          style={{
            backgroundImage: `url(${
              artist.images[0] != undefined
                ? artist.images[0].url
                : defArtistPic
            })`,
          }}
        ></div>
        <a className="card_link">
          <div
            className="card__img--hover"
            style={{
              backgroundImage: `url(${
                artist.images[0] != undefined
                  ? artist.images[0].url
                  : defArtistPic
              })`,
            }}
          ></div>
        </a>
        {/* Toggle if following */}
        <div
          className="card__info"
          style={
            isFollowing.length > 0
              ? { backgroundColor: "#FFA726" }
              : { backgroundColor: "#fff" }
          }
        >
          <span className="card__category">
            {" "}
            {artist.name.length > 21
              ? artist.name.slice(0, 18) + "..."
              : artist.name}
          </span>
          <h3 className="card__title"></h3>
          <span className="card__by">
            Genres:{" "}
            <a className="card__author" title="author">
              {artist.genres.length > 0
                ? adjustGenrez.length > 20
                  ? adjustGenrez.slice(0, 17) + "..."
                  : adjustGenrez
                : "Unknown"}
            </a>
          </span>
          <br />
          <span className="card__by">
            Popularity:{" "}
            <a className="card__author" title="author">
              {`${artist.popularity}/ 100`}
            </a>
            {/* CHECKIN' IF THE USER ALREADY FOLLOWIN' */}
            {isFollowing.length > 0 ? (
              //Already following
              <>
                <br />
                <svg
                  onClick={(e) => {
                    console.log("User requested to unfollow the artist:");
                    console.log(findIntel);
                    console.log(artist);
                    handleUnfollowArtist(e, findIntel[0].id);
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
            ) : (
              //Not following
              <>
                <br />
                <svg
                  onClick={(e) =>
                    handleFollowArtist(e, {
                      userID: loggedUser.id,
                      userName: loggedUser.userName,
                      artistID: artist.id,
                      artistName: artist.name,
                      artistPic: artist.images[0].url,
                      artistPopularity: artist.popularity,
                      artistSpotifyLink: artist.external_urls["spotify"],
                      artistGenrez: artist.genres,
                      artistFollowerCount: artist.followers["total"],
                    })
                  }
                  style={{
                    marginTop: "4px",
                    color: "#C88413",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-star"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>
                <span style={{ marginLeft: "2px" }}>Follow</span>
              </>
            )}
          </span>
        </div>
      </article>
    );
  });

  //? Render Playlists
  let toRenderPlaylists = playlists.map((playlist) => {
    let isFollowing = userPlaylistz.filter((f) => f.playlistID == playlist.id);

    let findIntel = userPlaylistz.filter((f) => f.playlistID == playlist.id);

    // description
    // images
    // name
    // owner.display_name
    // tracks.total
    return (
      <article
        key={playlist.id}
        className="card card--1"
        // onClick={() => {
        //   window.open(playlist.external_urls["spotify"], "_blank");
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
              Total Tracks:
              {playlist.tracks.total > 0 ? playlist.tracks.total : 0}
            </span>
          </div>
        </div>
        <div
          className="card__img"
          style={{
            backgroundImage: `url(${
              playlist.images[0].url != undefined
                ? playlist.images[0].url
                : defPlaylistPic
            })`,
          }}
        ></div>
        <a href="#" className="card_link">
          <div
            className="card__img--hover"
            style={{ backgroundImage: `url(${playlist.images[0].url})` }}
          ></div>
        </a>
        <div
          className="card__info"
          style={
            isFollowing.length > 0
              ? { backgroundColor: "#FFA726" }
              : { backgroundColor: "#fff" }
          }
        >
          <span className="card__category">
            {" "}
            {playlist.name.length > 25
              ? playlist.name.slice(0, 25) + "..."
              : playlist.name}
          </span>
          <br />
          <br />
          <span className=" " style={{ color: "#808080" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-blockquote-left"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm0 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6zm-5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11zm.79-5.373c.112-.078.26-.17.444-.275L3.524 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282c.024-.203.065-.37.123-.498a1.38 1.38 0 0 1 .252-.37 1.94 1.94 0 0 1 .346-.298zm2.167 0c.113-.078.262-.17.445-.275L5.692 6c-.122.074-.272.17-.452.287-.18.117-.35.26-.51.428a2.425 2.425 0 0 0-.398.562c-.11.207-.164.438-.164.692 0 .36.072.65.217.873.144.219.385.328.72.328.215 0 .383-.07.504-.211a.697.697 0 0 0 .188-.463c0-.23-.07-.404-.211-.521-.137-.121-.326-.182-.568-.182h-.282a1.75 1.75 0 0 1 .118-.492c.058-.13.144-.254.257-.375a1.94 1.94 0 0 1 .346-.3z" />
            </svg>
            &nbsp;
            {/* Description: too long */}
            Description:&nbsp;
            {playlist.description.length > 0
              ? playlist.description.length > 45
                ? playlist.description.slice(0, 35) + ".."
                : playlist.description
              : "Not provided."}
          </span>
          <br />
          <h3 className="card__title">
            Tracks:
            <span style={{ color: "#AD7D52", marginLeft: "3px" }}>
              {playlist.tracks.total > 0 ? playlist.tracks.total : 0}
            </span>
          </h3>
          <span className="card__by">
            Owner:{" "}
            <a href="#" className="card__author" title="author">
              {playlist.owner.display_name}
            </a>
          </span>
          <span className="card__by">
            {/* CHECKIN' IF THE USER ALREADY FOLLOWIN' */}
            {isFollowing.length > 0 ? (
              //Already following
              <>
                <br />
                <svg
                  onClick={(e) => {
                    handleUnfollowPlaylist(e, findIntel[0].id);
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
            ) : (
              //Not following
              <>
                <br />
                <svg
                  onClick={(e) =>
                    handleFollowPlaylist(e, {
                      userID: loggedUser.id,
                      userName: loggedUser.userName,
                      playlistID: playlist.id,
                      playlistName: playlist.name,
                      playlistDescription: playlist.description,
                      playlistOwner: playlist.owner["display_name"],
                      playlistPic: playlist.images[0].url,
                      playlistTrackCount: playlist.tracks.total,
                      playlistUrl: playlist.external_urls["spotify"],
                    })
                  }
                  style={{
                    marginTop: "4px",
                    color: "#C88413",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-star"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>
                <span style={{ marginLeft: "2px" }}>Follow</span>
              </>
            )}
          </span>

          <br />

          {/* playlistDescription
              "defDescription"

              playlistOwner
              "defOwner"

              playlistPic
              "defPic"

              playlistTrackCount
              "333"

              playlistUrl
              "defUrl"

              userID
              "444"

              userName
              "defUser" */}
        </div>
      </article>
    );
  });

  //? Render Playlists (iFrame)
  let toRenderPlaylistIFrame = playlists.map((playlist) => {
    return (
      <article
        key={playlist.id + "playlist"}
        style={{ width: "466px !important", height: "440px !important" }}
        className="card card--1 sPlaylist"
        // onClick={() => {
        //   window.open(artist.external_urls["spotify"], "_blank");
        // }}
      >
        <Spotify
          link={playlist.external_urls["spotify"]}
          style={{ width: "444px", height: "420px" }}
        />
      </article>
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
      {fromPage == "Login"
        ? setTimeout(() => {
            document
              .querySelector(".loading--container")
              .classList.add("loading--hide");
            document
              .querySelector(".loading--after")
              .classList.add("visibilityHidden", "visibilityVisible");
          }, 3000)
        : setTimeout(() => {
            document
              .querySelector(".loading--container")
              .classList.add("loading--hide");
            document
              .querySelector(".loading--after")
              .classList.add("visibilityHidden", "visibilityVisible");
          }, 0)}
      {/* PROFILE SEGMENT HERE */}
      {isProfile && (
        <ProfileV2 profileIntel={profileIntel} toggleProfile={setIsProfile} />
      )}

      <div className="loading--after visibilityHidden">
        {/* Profile popUp */}

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
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
          </a>
          &nbsp;|&nbsp;
          <a onClick={(e) => handlePaging(e, "Followin' Songs")}>
            Your Tracks&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-music-note"
              viewBox="0 0 16 16"
            >
              <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z" />
              <path fillRule="evenodd" d="M9 3v10H8V3h1z" />
              <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z" />
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
              className="bi bi-music-note-list"
              viewBox="0 0 16 16"
            >
              <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z" />
              <path fillRule="evenodd" d="M12 3v10h-1V3h1z" />
              <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z" />
              <path
                fillRule="evenodd"
                d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"
              />
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
        <h2 className="user--header" style={{ marginTop: "-30px" }}>
          Welcome {loggedUser.userName}
        </h2>
        <div className="searchForm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let inpValue = document.querySelector("#artistName").value;
              handleSpotifySearch(e, inpValue);
            }}
          >
            <input
              type="text"
              name="artistName"
              id="artistName"
              className="searchBox"
              placeholder="Artist/ Song/ Playlist"
            />

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
        </div>

        {toRenderTracks.length > 0 && (
          <>
            <h2 className="sHeader">— Tracks —</h2>
            <section className="cards">{toRenderTracksIFrame}</section>
            <section className="cards">{toRenderTracks}</section>
          </>
        )}
        {toRenderArtists.length > 0 && (
          <>
            <h2 className="sHeader">— Artists —</h2>
            <section className="cards">{toRenderArtists}</section>
          </>
        )}
        {toRenderPlaylists.length > 0 && (
          <>
            <h2 className="sHeader">— Playlists —</h2>
            <section className="cards sPlaylist">
              {toRenderPlaylistIFrame}
            </section>
            <section className="cards">{toRenderPlaylists}</section>
          </>
        )}
      </div>
    </>
  );
}
