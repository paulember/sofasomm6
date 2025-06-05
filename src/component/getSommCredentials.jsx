import { getSommelierTitle } from "./switchFunctions";

function copyText(
  todayBalthazarCount,
  todayAVGScore,
  todayTotalNotes,
  sommTitle
) {
  let line = "?⬛?";
  switch (todayBalthazarCount) {
    case 1:
      line = "🍷⬜ ⬜ ";
      break;
    case 2:
      line = "🍷🍷⬜ ";
      break;
    case 3:
      line = "🍷🍷🍷";
      break;
    default:
      line = "⬜ ⬜ ⬜";
  }

  const avgScoreText = "Daily Score: " + todayAVGScore + " - " + sommTitle;
  const totalNotesText = "Daily Notes: " + todayTotalNotes;

  const shareLink = `https://sofasomm.vercel.app/`;
  const text =
    line +
    " \n \n" +
    avgScoreText +
    " \n \n" +
    totalNotesText +
    " \n \n" +
    "Play SofaSomm \n \n" +
    shareLink;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Stats Copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
}

function ShareButton({ todayBalthazarCount, todayAVGScore, todayTotalNotes }) {
  const sommTitle = getSommelierTitle(todayAVGScore);
  return (
    <button
      className="sofaSommHelp"
      onClick={() =>
        copyText(todayBalthazarCount, todayAVGScore, todayTotalNotes, sommTitle)
      }
    >
      Share
    </button>
  );
}

function getSommCredentials({
  LSTastingCount,
  todayTotalScore,
  todayAVGScore,
  todayTastingCount,
  todayBalthazarCount,
  todayTotalNotes,
  LSTotalScore,
  LSBalthazarCount,
  LSTotalNotes,
  lastJulianPlayed,
  julianDate,
}) {
  const sommTitle = getSommelierTitle(todayAVGScore);
  return (
    <div>
      <table>
        <tr>
          <td class="td-bottleHistory">
            {" "}
            Sommelier Credentials #### julPlayed:{lastJulianPlayed}
            ####julDate:{julianDate}
          </td>
        </tr>
      </table>
      <table className="statTable td-statBox alignRight">
        <tbody>
          <tr>
            <td>Tastings: {LSTastingCount}</td>
            <td>Somm Rating</td>
            <td>Balthazar</td>
            <td>Notes</td>
          </tr>
          <tr>
            <td>Today Avg</td>
            <td>
              {todayAVGScore} -{sommTitle}
            </td>
            <td>
              {((todayBalthazarCount / todayTastingCount) * 100).toFixed(0)}%
            </td>
            <td>{(todayTotalNotes / todayTastingCount).toFixed(1)}</td>
          </tr>
          <tr>
            <td>Today Tot</td>
            <td>{todayTotalScore}</td>
            <td>{todayBalthazarCount}</td>
            <td>{todayTotalNotes}</td>
          </tr>
          <tr>
            <td>Career Avg</td>
            <td>{(LSTotalScore / LSTastingCount).toFixed(1)}</td>
            <td>{((LSBalthazarCount / LSTastingCount) * 100).toFixed(0)}%</td>
            <td>{(LSTotalNotes / LSTastingCount).toFixed(1)}</td>
          </tr>
          <tr>
            <td>Totals</td>
            <td>{LSTotalScore}</td>
            <td>{LSBalthazarCount}</td>
            <td>{LSTotalNotes}</td>
          </tr>
          <tr>
            <td>
              <ShareButton
                todayBalthazarCount={todayBalthazarCount}
                todayAVGScore={todayAVGScore}
                todayTotalNotes={todayTotalNotes}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default getSommCredentials;
