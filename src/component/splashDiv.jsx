import React from 'react';

function handleClearClick() {
  if (
    confirm(
      "Press OK to Clear Your SofaSomm Cache.\n \n THIS WILL REMOVE ALL RECORDS OF YOUR PREVIOUS TASTINGS. \n \n Press Cancel to return to the Splash Screen. "
    )
  ) {
    localStorage.removeItem("lastJulianPlayed", 0);
  } else {
  }
}

const QRCodeDiv = () => {
  return (
    <div>
      <a
        href="https://sofasomm.vercel.app/"
        target="_blank"
        rel="noreferrer"
      >
        https://sofasomm.vercel.app/{" "}
      </a>{" "}
    </div>
  );
};

function SplashDiv({ game, julianDate }) {
  if (game == null) {
    return (
      <div>
        <h3> Welcome Sofa Sommelier! </h3>
        <p> Sofa Somm is a tool to help build your wine tasting skills. </p>
        <p> Begin your tasting by clicking the Yellow START button above. </p>
        <table>
          <td class="splashQuote">
            "Sofa Somm is Better Than A Chiefs Game" - Taylor S.
          </td>
        </table>
        <p>
          {" "}
          Each TASTING consists of 6 notes displayed at the top of the screen.{" "}
        </p>
        <p>
          Find these tasting notes by SELECTING and OPENING a BOTTLE from the
          Wine(Varietal) list dropdown.{" "}
        </p>
        <p> Notes that MATCH the opened bottle will switch to GREEN. </p>
        <p> Your goal is to find all 6 Notes in as few bottles as possible. </p>
        <p>You can open up to 6 bottles for each tasting. </p>
        <h2> Happy Tasting!!! </h2>
        <QRCodeDiv />
        <div>
          Data Source: &nbsp;
          <a
            href="https://winefolly.com/grapes"
            target="_blank"
            rel="noreferrer"
          >
            Wine Folly{" "}
          </a>{" "}
          {""}
        </div>
        <div>
          Additional Graphics: &nbsp;
          <a href="https://tenor.com/" target="_blank" rel="noreferrer">
            tenor.com{" "}
          </a>{" "}
        </div>
        <h2 class="sofaSommTitle ">
          {" "}
          <b>
            {" "}
            <i> Sofa Somm </i>
          </b>
        </h2>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>

        <table>
          <tr>
            <td class="td-bottleHistory"> #### {julianDate} ####</td>
          </tr>
        </table>

        <button class="resetButton" onClick={handleClearClick}>
          {" "}
          CC
        </button>
      </div>
    );
  }
}

export default SplashDiv;
