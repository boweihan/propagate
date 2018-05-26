const Levels = {
  1: { size: 3, moves: 15, stars: [0, 10, 14], initialBoard: {} },
  2: { size: 3, moves: 15, stars: [0, 5, 10], initialBoard: { 4: 'f' } },
  3: {
    size: 3,
    moves: 15,
    stars: [0, 5, 10],
    initialBoard: { 2: 'f', 4: 'f' },
  },
  4: { size: 3, moves: 15, stars: [0, 5, 10], initialBoard: { 1: 'd' } },
  5: {
    size: 3,
    moves: 15,
    stars: [0, 5, 10],
    initialBoard: { 2: 'f', 3: 'd' },
  },
  6: {
    size: 3,
    moves: 15,
    stars: [0, 5, 10],
    initialBoard: { 2: 'f', 5: 'd', 6: 't' },
  },
  7: {
    size: 3,
    moves: 15,
    stars: [0, 5, 10],
    initialBoard: { 2: 'f', 4: 'd', 5: 'd', 6: 't' },
  },
  8: {
    size: 3,
    moves: 15,
    stars: [0, 5, 10],
    initialBoard: { 2: 'f', 4: 'd', 5: 't', 6: 'd', 7: 't' },
  },
  9: { size: 4, moves: 20, stars: [0, 10, 15], initialBoard: {} },
  10: {
    size: 4,
    moves: 20,
    stars: [0, 10, 15],
    initialBoard: { 8: 'f', 2: 'f' },
  },
  11: {
    size: 4,
    moves: 20,
    stars: [0, 10, 15],
    initialBoard: { 1: 'd', 2: 'f', 4: 'f', 7: 'f' },
  },
  12: {
    size: 4,
    moves: 20,
    stars: [0, 10, 15],
    initialBoard: { 2: 'f', 5: 'd', 8: 'd', 9: 't', 10: 'f' },
  },
  13: {
    size: 4,
    moves: 20,
    stars: [0, 10, 15],
    initialBoard: {
      2: 'f',
      4: 'd',
      5: 't',
      6: 'd',
      7: 't',
      8: 'd',
      9: 'f',
      14: 't',
    },
  },
  14: {
    size: 4,
    moves: 20,
    stars: [0, 10, 15],
    initialBoard: {
      3: 'f',
      5: 'd',
      7: 't',
      9: 'd',
      11: 't',
      12: 'd',
      13: 'f',
      14: 't',
      15: 'd',
    },
  },
  15: { size: 5, moves: 25, stars: [0, 10, 20], initialBoard: {} },
  16: {
    size: 5,
    moves: 25,
    stars: [0, 10, 15],
    initialBoard: { 3: 'f', 6: 'f', 12: 'f', 16: 'd' },
  },
  17: {
    size: 5,
    moves: 25,
    stars: [0, 10, 15],
    initialBoard: { 2: 'f', 5: 'd', 8: 'd', 9: 't', 10: 'f' },
  },
  18: {
    size: 5,
    moves: 25,
    stars: [0, 5, 10],
    initialBoard: {
      2: 'f',
      4: 'd',
      5: 't',
      6: 'd',
      7: 't',
      8: 'd',
      9: 'f',
      14: 't',
    },
  },
  19: {
    size: 5,
    moves: 25,
    stars: [0, 5, 10],
    initialBoard: {
      1: 'd',
      2: 't',
      3: 't',
      4: 'd',
      8: 'd',
      10: 't',
      11: 't',
      12: 'd',
      17: 'd',
      18: 't',
      21: 'd',
    },
  },
  20: { size: 6, moves: 30, stars: [0, 20, 25], initialBoard: {} },
  21: {
    size: 6,
    moves: 30,
    stars: [0, 10, 20],
    initialBoard: { 1: 'f', 3: 'f', 16: 'f', 21: 'd' },
  },
  22: {
    size: 6,
    moves: 30,
    stars: [0, 10, 20],
    initialBoard: { 6: 'd', 7: 't', 8: 'd', 9: 'f', 24: 't' },
  },
  23: {
    size: 6,
    moves: 30,
    stars: [0, 10, 20],
    initialBoard: {
      2: 't',
      4: 't',
      5: 't',
      16: 't',
      17: 't',
      24: 't',
      29: 't',
      34: 't',
    },
  },
  25: {
    size: 6,
    moves: 30,
    stars: [0, 10, 20],
    initialBoard: {
      1: 'd',
      2: 't',
      3: 't',
      4: 'd',
      8: 'd',
      10: 't',
      11: 't',
      12: 'd',
      17: 'd',
      18: 't',
    },
  },
};

class LevelUtils {
  static getMaxLevel() {
    return Object.keys(Levels).length;
  }

  static getLevelSpecs(level) {
    // TODO: better way to do levels
    if (!level) {
      return { size: 0, moves: 0 };
    }
    return Levels[level];
  }
}

export default LevelUtils;
