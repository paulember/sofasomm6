function getSommelierTitle(noteCount) {
  switch (true) {
    case noteCount >= 98:
      return "MASTER SOMMELIER";
    case noteCount >= 90:
      return "Advanced Sommelier";
    case noteCount >= 80:
      return "Certified Sommelier";
    default:
      return "Beginning Sommelier";
  }
}

export { getSommelierTitle };
