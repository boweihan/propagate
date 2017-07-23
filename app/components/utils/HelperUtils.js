class HelperUtils {
    // temporary compare function for sorting leaderboard on push, better to use a tree
    static compare(a, b) {
        if (a.score < b.score) { return 1; }
        if (a.score > b.score) { return -1; }
        return 0;
    }

    static getLevelSpecs(level) { // TODO: better way to do levels
        const specs = {};
        if (!level || level < 9) {
            specs.size = 3; specs.moves = 15;
        } else if (level >= 9 && level < 17) {
            specs.size = 4; specs.moves = 20;
        } else if (level >= 17 && level < 25) {
            specs.size = 5; specs.moves = 25;
        } else if (level >= 25 && level < 33) {
            specs.size = 6; specs.moves = 30;
        } else if (level >= 33 && level < 41) {
            specs.size = 7; specs.moves = 40;
        } else {
            specs.size = 8; specs.moves = 50;
        }
        return specs;
    }

    static formatTriColor(triColor) {
        if (triColor) { return triColor; }
        return 'OFF';
    }
}

export default HelperUtils;
