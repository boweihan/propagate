class HelperUtils {
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
