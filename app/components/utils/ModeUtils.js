// TODO: refactor this
const Modes = ['square', 'plus', 'cross']; // duplicate

class ModeUtils {
    static getIdsForMode(id, mode, boardSize) {
        let ids;
        switch (mode) {
        case Modes[0]:
            ids = ModeUtils.squareModeClickHandler(id, boardSize); break;
        case Modes[1]:
            ids = ModeUtils.plusModeClickHandler(id, boardSize); break;
        case Modes[2]:
            ids = ModeUtils.crossModeClickHandler(id, boardSize); break;
        default:
            break;
        }
        return ids;
    }

    static buildClickHandlerVars(id, boardSize) {
        return [boardSize, id % boardSize, Math.floor(id / boardSize)];
    }

    static plusModeClickHandler(id, boardSize) {
        let ids = [id];
        const [size, xPos, yPos] = ModeUtils.buildClickHandlerVars(id, boardSize);

        if (yPos === 0) {
            if (xPos === 0) {
                ids = ids.concat([id + 1, id + size]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - 1, id + 1, id + size]);
            } else {
                ids = ids.concat([id - 1, id + size]);
            }
        } else if (yPos < size - 1) {
            if (xPos === 0) {
                ids = ids.concat([id + 1, id + size, id - size]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - 1, id + 1, id + size, id - size]);
            } else {
                ids = ids.concat([id - 1, id + size, id - size]);
            }
        } else {
            if (xPos === 0) {
                ids = ids.concat([id + 1, id - size]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - 1, id + 1, id - size]);
            } else {
                ids = ids.concat([id - 1, id - size]);
            }
        }

        return ids;
    }

    static squareModeClickHandler(id, boardSize) {
        let ids = [id];
        const [size, xPos, yPos] = ModeUtils.buildClickHandlerVars(id, boardSize);

        if (yPos === 0) {
            if (xPos === 0) {
                ids = ids.concat([id + 1, id + size, id + size + 1]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - 1, id + 1, id + size, (id + size) - 1, id + size + 1]);
            } else {
                ids = ids.concat([id - 1, id + size, (id + size) - 1]);
            }
        } else if (yPos < size - 1) {
            if (xPos === 0) {
                ids = ids.concat([id + 1, id + size, id - size, id + size + 1, (id - size) + 1]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - 1, id + 1, id + size, id - size, (id + size) - 1, id + size + 1, id - size - 1, (id - size) + 1]);
            } else {
                ids = ids.concat([id - 1, id + size, id - size, id - size - 1, (id + size) - 1]);
            }
        } else {
            if (xPos === 0) {
                ids = ids.concat([id + 1, id - size, (id - size) + 1]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - 1, id + 1, id - size, id - size - 1, (id - size) + 1]);
            } else {
                ids = ids.concat([id - 1, id - size, id - size - 1]);
            }
        }

        return ids;
    }

    static crossModeClickHandler(id, boardSize) {
        let ids = [id];
        const [size, xPos, yPos] = ModeUtils.buildClickHandlerVars(id, boardSize);

        if (yPos === 0) {
            if (xPos === 0) {
                ids = ids.concat([id + size + 1]);
            } else if (xPos < size - 1) {
                ids = ids.concat([(id + size) - 1, id + size + 1]);
            } else {
                ids = ids.concat([(id + size) - 1]);
            }
        } else if (yPos < size - 1) {
            if (xPos === 0) {
                ids = ids.concat([id + size + 1, (id - size) + 1]);
            } else if (xPos < size - 1) {
                ids = ids.concat([(id + size) - 1, id + size + 1, id - size - 1, (id - size) + 1]);
            } else {
                ids = ids.concat([id - size - 1, (id + size) - 1]);
            }
        } else {
            if (xPos === 0) {
                ids = ids.concat([(id - size) + 1]);
            } else if (xPos < size - 1) {
                ids = ids.concat([id - size - 1, (id - size) + 1]);
            } else {
                ids = ids.concat([id - size - 1]);
            }
        }

        return ids;
    }
}

export default ModeUtils;
