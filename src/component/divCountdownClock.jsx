function divCountdownClock({
  timeLeftHH,
  timeLeftMM,
  timeLeftSS,
  julianDate,
  lastJulianPlayed,
  game,
}) {
  if (julianDate != lastJulianPlayed) {
    return <div></div>;
  } else {
    return (
      <table className="notesTable">
        <tr>
          <td>sku</td>
          <td>####{lastJulianPlayed}</td>
          <td>####{julianDate}</td>
        </tr>
        <tr>
          <td>Next Tasting</td>
          <td>{`${timeLeftHH}:${timeLeftMM}:${timeLeftSS}`}</td>
          <td>game#: {game}</td>
        </tr>
      </table>
    );
  }
}

export default divCountdownClock;
