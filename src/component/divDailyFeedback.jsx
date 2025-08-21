import React from "react";
import "./../App.css";
import "./../styles.css";

function handleClickTastingNote(i, wineData, vennLabel) {
  const matchingWines = wineData.filter(
    (wine) =>
      wine.tastingNote[0] === vennLabel[i] ||
      wine.tastingNote[1] === vennLabel[i] ||
      wine.tastingNote[2] === vennLabel[i] ||
      wine.tastingNote[3] === vennLabel[i] ||
      wine.tastingNote[4] === vennLabel[i]
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
  postgameMessage,
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

      {postgameMessage[game - 1] && (
        <table className="modalTable">
          <tr>
            <td className="td-postgameMsg">
              <b>{postgameMessage[game - 1]}</b>
            </td>
          </tr>
        </table>
      )}

      <table>
        <tr>
          <td class="td-modalWineScore">
            {" "}
            <b>{wineScoreLabel} </b>{" "}
          </td>
        </tr>
        <tr>
          <td class="td-modalWineScore">
            Score: {wineScore} Bottles: {gameBottle} / Spills: {gameSpills}{" "}
          </td>
        </tr>
      </table>
      <table>
        <div>
          <div className="button_container_wrapper">
            {[0, 1].map((row) => (
              <div key={row} className="button_container">
                {vennLabel.slice(row * 3, row * 3 + 3).map((label, idx) => {
                  const index = row * 3 + idx;
                  return (
                    <button
                      key={index}
                      className={venntdClass[index]}
                      onClick={() =>
                        handleClickTastingNote(index, wineData, vennLabel)
                      }
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          Click Tasting Notes for Bottle Info
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
