const Levels = {
    1: { size: 3, moves: 15, stars: [0, 10, 14], initialBoard: {} },
    2: { size: 3, moves: 15, stars: [0, 5, 10], initialBoard: { 4: 'f' } },
    3: { size: 3, moves: 15, stars: [0, 5, 10], initialBoard: { 0: 'f' } },
    4: { size: 3, moves: 15, stars: [0, 5, 10], initialBoard: { 2: 'f', 4: 'f' } },
    5: { size: 3, moves: 15, stars: [0, 5, 10], initialBoard: { 1: 'd' } },
    6: { size: 3, moves: 15, stars: [0, 5, 10], initialBoard: { 2: 'f', 3: 'd' } },
    7: { size: 3, moves: 15, stars: [0, 5, 14], initialBoard: { 2: 'f', 5: 'd', 6: 't' } },
    8: { size: 3, moves: 15, stars: [0, 5, 10], initialBoard: { 2: 'f', 4: 'd', 5: 'd', 6: 't' } },
    9: { size: 3, moves: 15, stars: [0, 5, 10], initialBoard: { 2: 'f', 4: 'd', 5: 't', 6: 'd', 7: 't' } },
    10: { size: 4, moves: 20, stars: [0, 10, 15], initialBoard: {} },
    11: { size: 4, moves: 20, stars: [0, 10, 15], initialBoard: { 6: 'f' } },
    12: { size: 4, moves: 20, stars: [0, 10, 15], initialBoard: { 8: 'f', 2: 'f' } },
    13: { size: 4, moves: 20, stars: [0, 10, 15], initialBoard: { 2: 'f', 4: 'f', 7: 'f' } },
    14: { size: 4, moves: 20, stars: [0, 10, 15], initialBoard: { 1: 'd' } },
    15: { size: 4, moves: 20, stars: [0, 10, 15], initialBoard: { 3: 'f', 12: 'd' } },
    16: { size: 4, moves: 20, stars: [0, 10, 15], initialBoard: { 3: 'f', 8: 'd', 9: 't' } },
    17: { size: 4, moves: 20, stars: [0, 10, 15], initialBoard: { 2: 'f', 5: 'd', 8: 'd', 9: 't', 10: 'f' } },
    18: { size: 4, moves: 20, stars: [0, 10, 15], initialBoard: { 2: 'f', 4: 'd', 5: 't', 6: 'd', 7: 't', 8: 'd', 9: 'f', 14: 't' } },
    19: { size: 4, moves: 20, stars: [0, 10, 15], initialBoard: { 3: 'f', 5: 'd', 7: 't', 9: 'd', 11: 't', 12: 'd', 13: 'f', 14: 't', 15: 'd' } },
    20: { size: 5, moves: 25, stars: [0, 10, 20], initialBoard: { } },
    21: { size: 5, moves: 25, stars: [0, 10, 15], initialBoard: { 9: 'f', 12: 'f' } },
    22: { size: 5, moves: 25, stars: [0, 10, 15], initialBoard: { 3: 'f', 6: 'f', 12: 'f', 16: 'd' } },
    23: { size: 5, moves: 25, stars: [0, 10, 15], initialBoard: { 2: 'f', 5: 'd', 12: 'd', 17: 'd' } },
    24: { size: 5, moves: 25, stars: [0, 10, 15], initialBoard: { 2: 'f', 5: 'd', 8: 'd', 9: 't', 10: 'f' } },
    25: { size: 5, moves: 25, stars: [0, 10, 15], initialBoard: { 1: 'f', 4: 'd', 8: 't', 12: 'd', 18: 't', 20: 'd' } },
    26: { size: 5, moves: 25, stars: [0, 5, 10], initialBoard: { 2: 'f', 4: 'd', 5: 't', 6: 'd', 7: 't', 8: 'd', 9: 'f', 14: 't' } },
    27: { size: 5, moves: 25, stars: [0, 5, 10], initialBoard: { 1: 'd', 2: 't', 3: 't', 4: 'd', 8: 'd', 10: 't', 11: 't', 12: 'd', 17: 'd', 18: 't', 21: 'd' } },
    28: { size: 5, moves: 25, stars: [0, 5, 10], initialBoard: { 2: 'f', 4: 'd', 5: 't', 6: 'd', 7: 't', 12: 'f', 15: 'f', 17: 'f' } },
    29: { size: 5, moves: 25, stars: [0, 5, 10], initialBoard: { 3: 'f', 5: 'd', 7: 't', 9: 'd', 11: 't', 12: 'd', 13: 'f', 14: 't', 15: 'd' } },
    30: { size: 6, moves: 30, stars: [0, 20, 25], initialBoard: { } },
    31: { size: 6, moves: 30, stars: [0, 10, 20], initialBoard: { 12: 'f', 21: 'f' } },
    32: { size: 6, moves: 30, stars: [0, 10, 20], initialBoard: { 15: 'f', 17: 'f', 29: 'f' } },
    33: { size: 6, moves: 30, stars: [0, 10, 20], initialBoard: { 1: 'f', 3: 'f', 16: 'f', 21: 'd' } },
    34: { size: 6, moves: 30, stars: [0, 10, 20], initialBoard: { 2: 'f', 4: 'd', 5: 't' } },
    35: { size: 6, moves: 30, stars: [0, 10, 20], initialBoard: { 6: 'd', 7: 't', 8: 'd', 9: 'f', 24: 't' } },
    36: { size: 6, moves: 30, stars: [0, 10, 20], initialBoard: { 3: 'f', 5: 'd', 7: 't', 9: 'd', 11: 't', 12: 'd', 33: 'f', 34: 't' } },
    37: { size: 6, moves: 30, stars: [0, 10, 20], initialBoard: { 2: 't', 4: 't', 5: 't', 16: 't', 17: 't', 24: 't', 29: 't', 34: 't' } },
    38: { size: 6, moves: 30, stars: [0, 10, 20], initialBoard: { 2: 'f', 4: 'd', 7: 't', 10: 'd', 21: 't', 22: 'd', 25: 'f', 30: 't', 31: 'd' } },
    39: { size: 6, moves: 30, stars: [0, 10, 20], initialBoard: { 3: 'f', 5: 'd', 7: 't', 9: 'd', 11: 't', 12: 'd', 13: 'f', 14: 't', 15: 'd' } },
    40: { size: 6, moves: 30, stars: [0, 10, 20], initialBoard: { 1: 'd', 2: 't', 3: 't', 4: 'd', 8: 'd', 10: 't', 11: 't', 12: 'd', 17: 'd', 18: 't' } },
};

class LevelUtils {
    static getMaxLevel() {
        return Object.keys(Levels).length;
    }

    static getLevelSpecs(level) { // TODO: better way to do levels
        if (!level) {
            return { size: 0, moves: 0 };
        }
        return Levels[level];
    }
}

export default LevelUtils;
