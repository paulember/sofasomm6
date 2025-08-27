import React from "react";
import qrImage from "../component/QRSofaSomm.png";

function handleClearClick() {
  if (
    confirm(
      "Press OK to Clear Your Application Cache.\n \n THIS WILL REMOVE ALL RECORDS OF YOUR PREVIOUS GAMES. \n \n Press Cancel to return to the Splash Screen. "
    )
  ) {
    localStorage.removeItem("lastJulianPlayed", 0);
  } else {
  }
}

function handleDateOverrideClick() {
  const code = prompt(
    "Enter Code to Override Date Processing: 1234.\n\nTHIS MAY REMOVE RECORDS FROM YOUR PREVIOUS GAMES.\n\nLeave blank or press Cancel to return to the Splash Screen."
  );

  if (code && code.substring(0, 2) === "52") {
    // Get characters 3 to 5 (i.e., index 2, 3, and 4)
    const overrideValue = code.substring(2, 5);
    localStorage.setItem("dateOverride", overrideValue);
  } else {
    localStorage.setItem("dateOverride", "0");
  }
}

const QRCodeDiv = () => {
  return (
    <div>
      <div>
        <img src={qrImage} alt="https://sofasomm.vercel.app/" />
      </div>
      <a href="https://sofasomm.vercel.app/" target="_blank" rel="noreferrer">
        https://sofasomm.vercel.app/{" "}
      </a>{" "}
    </div>
  );
};

function SplashDiv({ game, julianDate, appTxt }) {
  if (game == null) {
    return (
      <div>
        <h3> Welcome to Sofa Sommelier! </h3>
        <p> {appTxt} is a tool to help build your wine tasting skills. </p>
        <p> Begin your tasting by clicking the Yellow START button above. </p>
        <table>
          <td class="splashQuote">
            "Sofa Somm is Better Than A Chiefs Game" - Taylor S.
          </td>
        </table>
        <p>
          {" "}
          For Instructions on How to Play and additional details check the
          Documentation{" "}
          <a
            href="https://phungo.blogspot.com/2024/01/sofasomm-wine-tasting-game.html"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .{" "}
        </p>
        <p>
          The link can also be used to report issues or give the Sofa Somm Team
          feedback. We would love to hear from you.
        </p>
        <h2> Happy Tasting!!! </h2>
        <QRCodeDiv />
        <div>&emsp;</div>
        <div>&emsp;</div>
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
        </div>{" "}
        <div>
          Try Our Baseball Trivia Game:
          <div>
            <a
              href="https://starting9.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              starting9.vercel.app{" "}
            </a>{" "}
          </div>
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
        <button class="resetButton" onClick={handleClearClick}>
          {" "}
          CC
        </button>
        <button class="resetButton" onClick={handleDateOverrideClick}>
          {" "}
          DT
        </button>
      </div>
    );
  }
}

export default SplashDiv;
