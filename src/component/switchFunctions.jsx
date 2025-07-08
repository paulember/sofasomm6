function getSommelierTitle(noteCount) {
  switch (true) {
    case noteCount >= 98:
      return "MASTER SOMMELIER";
    case noteCount >= 90:
      return "Advanced";
    case noteCount >= 80:
      return "Certified";
    default:
      return "Beginner";
  }
}

export { getSommelierTitle };
