function divCountdownClock({
  timeLeftHH,
  timeLeftMM,
  timeLeftSS,
  julianDate,
  lastJulianPlayed,
}) {
  if (julianDate != lastJulianPlayed) {
    return <div></div>;
  } else {
    return (
      <table className="notesTable">
        <tr>
          <td>lastJulPlayed-julianDate</td>
          <td>####{lastJulianPlayed}</td>
          <td>####{julianDate}</td>
        </tr>
        <tr>
          <td>Next Tasting</td>
          <td>{`${timeLeftHH}:${timeLeftMM}:${timeLeftSS}`}</td>
        </tr>
      </table>
    );
  }
}

export default divCountdownClock;
