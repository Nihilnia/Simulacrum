export default function ProfileCard(props) {
  const { daUserz, handleDelete } = props;

  let elementz = daUserz.map((f) => {
    return (
      <>
        <div className="grid-item">
          <article className="profile">
            <div className="profile-image">
              <img src="https://assets.codepen.io/285131/neongirl.jpg" />
            </div>
            <h2 className="profile-username">Elena Zoldado</h2>
            <small className="profile-user-handle">@elena_zoldado</small>
            <div className="profile-actions">
              <button className="btn btn--primary">Follow</button>
              <button className="btn btn--icon">
                <i className="ph-export"></i>
              </button>
              <button className="btn btn--icon">
                <i className="ph-dots-three-outline-fill"></i>
              </button>
            </div>
            <div className="profile-links">
              <a href="#" className="link link--icon">
                <i className="ph-twitter-logo"></i>
              </a>
              <a href="#" className="link link--icon">
                <i className="ph-facebook-logo"></i>
              </a>
              <a href="#" className="link link--icon">
                <i className="ph-instagram-logo"></i>
              </a>
            </div>
          </article>
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
