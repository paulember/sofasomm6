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
          <td>
            {" "}
            <b> Next Tasting: </b>
          </td>
          <td style={{ color: "red" }}>
            <b> {`${timeLeftHH}:${timeLeftMM}:${timeLeftSS}`} </b>{" "}
          </td>
        </tr>
      </table>
    );
  }
}

export default divCountdownClock;
