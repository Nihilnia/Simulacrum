export default function GetQuote(props) {
  const { handleClick, currentQuotez, handleDarkMode } = props;

  return (
    <>
      <div className="wrapper">
        <input type="checkbox" id="hide-checkbox" />
        <label
          htmlFor="hide-checkbox"
          className="toggle"
          onClick={handleDarkMode}
        >
          <span className="toggle-button">
            <span className="crater crater-1"></span>
            <span className="crater crater-2"></span>
            <span className="crater crater-3"></span>
            <span className="crater crater-4"></span>
            <span className="crater crater-5"></span>
            <span className="crater crater-6"></span>
            <span className="crater crater-7"></span>
          </span>
          <span className="star star-1"></span>
          <span className="star star-2"></span>
          <span className="star star-3"></span>
          <span className="star star-4"></span>
          <span className="star star-5"></span>
          <span className="star star-6"></span>
          <span className="star star-7"></span>
          <span className="star star-8"></span>
        </label>
      </div>
      {currentQuotez.length > 0 && (
        <>
          <blockquote id={currentQuotez.indexOf(currentQuotez[0].id)}>
            {currentQuotez[0].content}
          </blockquote>

          <cite>{currentQuotez[0].author}</cite>
        </>
      )}

      <div className="container" onClick={handleClick}>
        <a href="#" className="button">
          <div className="button__line"></div>
          <div className="button__line"></div>
          <span className="button__text">New Quote</span>
          <div className="button__drow1"></div>
          <div className="button__drow2"></div>
        </a>
      </div>
      {currentQuotez.length > 0 && (
        <a
          href={`http://twitter.com/share?text=${currentQuotez[0].content} -${currentQuotez[0].author}&hashtags=Quote`}
        >
          Share at Twitter
        </a>
      )}

      <h4>At total you got {currentQuotez.length} quotes</h4>
    </>
  );
}
