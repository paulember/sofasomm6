import { getSommelierTitle } from "./switchFunctions";

function copyText(
  todayBalthazarCount,
  todayAVGScore,
  todayTotalNotes,
  sommTitle,
  dailyBalthazar,
  LSBalthazarCount
) {
  const emptyBox = "◻️"; // White box (for positions)
  const wineGlass = "🍷";

  const line = dailyBalthazar.some((i) => i === 1)
    ? dailyBalthazar.map((i) => (i === 1 ? wineGlass : emptyBox)).join("")
    : wineGlass.repeat(todayBalthazarCount);

  const avgScoreText = "Daily Score: " + todayAVGScore + " - " + sommTitle;
  const totalNotesText = "Daily Notes: " + todayTotalNotes + "/18";

  const shareLink = `https://sofasomm.vercel.app/`;
  const text =
    "Today's SofaSomm #WineTasting Score \n \n" +
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

function ShareButton({
  todayBalthazarCount,
  todayAVGScore,
  todayTotalNotes,
  dailyBalthazar,
  LSBalthazarCount,
}) {
  const sommTitle = getSommelierTitle(todayAVGScore);
  return (
    <button
      className="sofaSommHelp"
      onClick={() =>
        copyText(
          todayBalthazarCount,
          todayAVGScore,
          todayTotalNotes,
          sommTitle,
          dailyBalthazar,
          LSBalthazarCount
        )
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
  isModalOpen,
  game,
  dailyBalthazar,
}) {
  const sommTitle = getSommelierTitle(todayAVGScore);
  return (
    <div>
      <table>
        <tr>
          <td class="td-bottleHistory">
            {" "}
            <b>Sommelier Credentials</b>
            {game != 1 && game != 2 && isModalOpen && (
              <ShareButton
                todayBalthazarCount={todayBalthazarCount}
                todayAVGScore={todayAVGScore}
                todayTotalNotes={todayTotalNotes}
                dailyBalthazar={dailyBalthazar}
                LSBalthazarCount={LSBalthazarCount}
              />
            )}
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
            {" "}
            <td>---</td>
            <td>---</td>
            <td>---</td>
            <td>---</td>
          </tr>

          <tr>
            <td>sku</td>
            <td>
              <small>#### {lastJulianPlayed}</small>
            </td>
            <td>
              <small>#### {julianDate}</small>
            </td>
            <td>sku</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default getSommCredentials;
