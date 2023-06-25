import "./Modal.css";
import userNotFound from "./userNotFound.png";
import wrongPass from "./wrongPass.png";

export default function Modal(props) {
  const { modal, setModal } = props;

  return (
    <>
      {modal.isShow && (
        <div className="modal--container">
          <div className="cookiesContent" id="cookiesPopup">
            <button className="close" onClick={() => setModal((prev) => !prev)}>
              ✖
            </button>
            {modal.information == "User not found." ? (
              <img src={userNotFound} alt="cookies-img" />
            ) : (
              <img src={wrongPass} alt="cookies-img" />
            )}
            <p>
              {modal.information} <br />"{modal.userName}"
            </p>
            <button
              className="accept"
              onClick={() => setModal((prev) => !prev)}
            >
              Try again!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
