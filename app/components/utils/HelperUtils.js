class HelperUtils {
  // temporary compare function for sorting leaderboard on push, better to use a tree
  static compare(a, b) {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  }

  static formatTriColor(triColor) {
    if (triColor) {
      return triColor;
    }
    return 'OFF';
  }
}

export default HelperUtils;
