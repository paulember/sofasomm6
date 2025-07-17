import React from "react";
import "./../App.css";
import "./../styles.css";

function handleClickTastingNote(i, wineData, vennLabel) {
  const matchingWines = wineData.filter(
    (wine) =>
      wine.tastingNote1 === vennLabel[i] ||
      wine.tastingNote2 === vennLabel[i] ||
      wine.tastingNote3 === vennLabel[i] ||
      wine.tastingNote4 === vennLabel[i] ||
      wine.tastingNote5 === vennLabel[i]
  );

  const matchingWinesLength = matchingWines.length;
  let wineMatchList =
    "\nWine Styles Known for " + vennLabel[i] + " Tasting Notes: \n \n";

  for (let j = 0; j < matchingWinesLength; j++) {
    wineMatchList = wineMatchList + matchingWines[j].style;
    wineMatchList = wineMatchList + "\n";
  }
  alert(wineMatchList);
}

const DivDusanBottle = ({ wineData, dusanBottle, dusanNotes }) => {
  const dusanBottleDash = dusanBottle.replace(/ /g, "-").toLowerCase();
  const dusanLink = "https://winefolly.com/grapes/" + dusanBottleDash;
  return (
    <table>
      <tr>
        <td class="td-magnum">
          {" "}
          Magnum Bottle:{" "}
          <a href={dusanLink} target="_blank" rel="noreferrer">
            {dusanBottle}{" "}
          </a>{" "}
          {dusanNotes}{" "}
        </td>
      </tr>
    </table>
  );
};

function DivDailyFeedback({
  wineScore,
  wineScoreLabel,
  gameBottle,
  gameSpills,
  game,
  gameNotesAcquired,
  venntdClass,
  vennLabel,
  wineData,
  dusanBottle,
  dusanNotes,
}) {
  const dusanBottleDash = dusanBottle.replace(/ /g, "-").toLowerCase();

  const dusanLink = "https://winefolly.com/grapes/" + dusanBottleDash;

  return (
    <div>
      {game != 1 && game != 2 ? (
        <h1 class="h1-background-bubbles">CHEERS!!! </h1>
      ) : (
        <h2> Tasting {game} of 3 </h2>
      )}

      <table class="modalTable">
        <tr>
          <td class="td-modalWineScore">
            {" "}
            <b>{wineScoreLabel} </b>{" "}
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td class="td-modalStats">Score: {wineScore}</td>

          <td class="td-modalStats">
            Bottles: {gameBottle} / Spills: {gameSpills}{" "}
          </td>
        </tr>
      </table>
      <table>
        <div>
          Click Tasting Notes for Bottle Info
          <div class="button_container">
            <button
              class={venntdClass[0]}
              onClick={() => handleClickTastingNote(0, wineData, vennLabel)}
            >
              {" "}
              {vennLabel[0]}
            </button>
            <button
              class={venntdClass[1]}
              onClick={() => handleClickTastingNote(1, wineData, vennLabel)}
            >
              {" "}
              {vennLabel[1]}
            </button>
            <button
              class={venntdClass[2]}
              onClick={() => handleClickTastingNote(2, wineData, vennLabel)}
            >
              {" "}
              {vennLabel[2]}
            </button>
          </div>
          <div class="button_container">
            <button
              class={venntdClass[3]}
              onClick={() => handleClickTastingNote(3, wineData, vennLabel)}
            >
              {" "}
              {vennLabel[3]}
            </button>
            <button
              class={venntdClass[4]}
              onClick={() => handleClickTastingNote(4, wineData, vennLabel)}
            >
              {" "}
              {vennLabel[4]}
            </button>
            <button
              class={venntdClass[5]}
              onClick={() => handleClickTastingNote(5, wineData, vennLabel)}
            >
              {" "}
              {vennLabel[5]}
            </button>
          </div>
        </div>
        <div>
          <DivDusanBottle
            wineData={wineData}
            dusanBottle={dusanBottle}
            dusanNotes={dusanNotes}
          />
        </div>
      </table>
    </div>
  );
}
export { DivDailyFeedback, DivDusanBottle };
