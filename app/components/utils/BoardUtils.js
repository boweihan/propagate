import { Animated, Dimensions } from 'react-native';

const Modes = ['square', 'plus', 'cross'];
const Width = Dimensions.get('window').width;

class BoardUtils {
    static buildBoard(size, movesLeft, colors) {
        const cellSize = (0.8 * Width) / size;
        const cellPadding = cellSize * 0.01;
        const tileSize = cellSize - (cellPadding * 2);
        const opacities = BoardUtils.getInitialOpacities(size);
        const tilts = BoardUtils.getInitialTilt(size);
        const tiles = BoardUtils.getInitialTileState(size, cellSize, cellPadding, opacities, tilts, colors);
        return { size, cellSize, cellPadding, tileSize, opacities, tilts, tiles, movesLeft, mode: Modes[0] };
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

    static getInitialTileState(size, cellSize, cellPadding, opacities, tilts, colors) {
        const tiles = [];
        for (let row = 0; row < size; row += 1) {
            for (let col = 0; col < size; col += 1) {
                const key = (row * size) + col;
                const tileStyle = { // tile styling
                    left: (col * cellSize) + cellPadding,
                    top: (row * cellSize) + cellPadding,
                    opacity: opacities[key],
                    transform: [{ perspective: cellSize * 100 }, { rotateX: tilts[key].interpolate({
                        inputRange: [0, 1], outputRange: ['0deg', '-90deg'] }) }],
                    backgroundColor: colors[0],
                };
                const mods = []; // extra classes for additional behaviour
                tiles.push({ key, tileStyle, mods, colorsOverride: null });
            }
        }
        return tiles;
    }
}

export default BoardUtils;
