import Gameboard from "./boardGame.js";

const Player = function() {
    let gameboard = new Gameboard();

    return {
        gameboard,
    }
};

const Computer = function() {
    let gameboard = new Gameboard();

    return {
        gameboard,
    }
};

export default { Player, Computer };
