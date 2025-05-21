function getSommCredentials({
  LSTastingCount,
  todayTotalScore,
  todayTastingCount,
  todayBalthazarCount,
  todayTotalNotes,
  LSTotalScore,
  LSBalthazarCount,
  LSTotalNotes,
}) {
  return (
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
          <td>{(todayTotalScore / todayTastingCount).toFixed(1)}</td>
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
      </tbody>
    </table>
  );
}

export default getSommCredentials;
