function getSommelierTitle(noteCount, appScoreFloors) {
  for (let [floor, grade] of appScoreFloors) {
    if (noteCount >= floor) {
      return grade;
    }
  }
  return "none";
}

export { getSommelierTitle };
