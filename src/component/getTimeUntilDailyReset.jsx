function getTimeUntilDailyReset() {
  const now = new Date();
  const nextReset = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1, // next day
      0,
      0,
      0,
      0 // at 00:00:00 UTC
    )
  );

  const diff = nextReset - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

function getMMMDD(date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const mmm = monthNames[date.getMonth()];
  const dd = String(date.getDate()).padStart(2, "0");

  return `${mmm}${dd}`;
}

export { getTimeUntilDailyReset, getMMMDD };
