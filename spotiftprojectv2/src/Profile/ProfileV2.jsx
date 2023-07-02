import defPP from "../Profile/defPP.jpg";

export default function ProfileV2(props) {
  const { profileIntel, toggleProfile } = props;

  return (
    <>
      {/* <h2>Somethings...</h2>
      User: {loggedUser.userName}
      Songz: {userFollowCountz.folowingSongz}
      Artists: {userFollowCountz.followingArtistz}
      Playlist: {userFollowCountz.followingPlaylistz} */}
      <div
        onClick={(e) => {
          toggleProfile((prev) => !prev);
        }}
        className="profileContainer"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.01)",
          width: "1890px",
          height: "1060px",
          position: "absolute",
          zIndex: "2",
          marginLeft: "10px",
        }}
      >
        <div
          className="frame"
          style={{
            position: "absolute",
            top: "333px",
            left: "760px",
            margin: "auto",
            zIndex: "1",
            borderRadius: "12px",
          }}
        >
          <div
            className="center"
            style={{
              borderRadius: "12px",
            }}
          >
            <div className="profile">
              <div className="image">
                <div className="circle-1"></div>
                <div className="circle-2"></div>
                <img
                  src={defPP}
                  width="70"
                  height="70"
                  alt={profileIntel.userName}
                />
              </div>
              <div className="name">{profileIntel.userName}</div>
              <div className="job">Registered User</div>

              <div className="actions">
                <button className="btn">Follow</button>
                <button className="btn">Message</button>
              </div>
            </div>

            <div className="stats">
              <div className="box">
                <span className="value">
                  {profileIntel.intelArtistz.length}
                </span>
                <span className="parameter">Following Artists</span>
              </div>
              <div className="box">
                <span className="value">{profileIntel.intelSongz.length}</span>
                <span className="parameter">Following Songs</span>
              </div>
              <div className="box">
                <span className="value">
                  {profileIntel.intelPlaylistz.length}
                </span>
                <span className="parameter">Following Playlists</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
