const Gameboard = require('./boardGame');

describe('Testing Gameboard', () => {
    it('test placement', () => {
        const board = new Gameboard();
        board.putShipOnBoard();

        const flat = board.getBoard().flat();
        const placedCells = flat.filter(cell => cell !== null);

        expect(placedCells.length).toBeGreaterThanOrEqual(17);
    });

});