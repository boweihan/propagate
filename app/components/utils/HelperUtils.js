import { Animated } from 'react-native';

const RegularTileColors = ['#403837', '#BE3E2C'];

class HelperUtils {
    // temporary compare function for sorting leaderboard on push, better to use a tree
    static compare(a, b) {
        if (a.score < b.score) { return 1; }
        if (a.score > b.score) { return -1; }
        return 0;
    }

    static getLevelSpecs(level) { // TODO: better way to do levels
        const specs = {};
        if (level < 9) {
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

    static getInitialOpacities(size) {
        const opacities = new Array(size * size);
        for (let i = 0; i < opacities.length; i += 1) { opacities[i] = new Animated.Value(1); }
        return opacities;
    }

    static getInitialTilt(size) {
        const tilt = new Array(size * size);
        for (let i = 0; i < tilt.length; i += 1) { tilt[i] = new Animated.Value(0); }
        return tilt;
    }

    static formatTriColor(triColor) {
        if (triColor) { return triColor; }
        return 'OFF';
    }

    static getModeTiles(size, cellSize, tilesToFlip) {
        const tiles = [];
        for (let row = 0; row < size; row += 1) {
            for (let col = 0; col < size; col += 1) {
                const key = (row * size) + col;
                let tileColor = RegularTileColors[0];
                if (tilesToFlip && tilesToFlip.indexOf(key) !== -1) {
                    tileColor = RegularTileColors[1];
                }
                const tileStyle = {
                    left: (col * cellSize) + 1.5,
                    top: (row * cellSize) + 1.5,
                    backgroundColor: tileColor,
                    position: 'absolute',
                    width: cellSize - 3,
                    height: cellSize - 3,
                };
                tiles.push({ key, tileStyle }); // shorthand notation
            }
        }
        return tiles;
    }
}

export default HelperUtils;
