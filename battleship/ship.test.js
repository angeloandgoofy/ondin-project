const shipFactory = require('./ship');

describe('Ship Factory', () => {
    it('creates a ship with correct length and hits array', () => {
        const ship = shipFactory(3);
        expect(ship.length).toBe(3);
        expect(ship.hits).toEqual([false, false, false]);
    });

    it('registers a hit at the correct position', () => {
        const ship = shipFactory(3);
        ship.hit(1);
        expect(ship.hits).toEqual([false, true, false]);
    });

    it('returns true if ship is sunk', () => {
        const ship = shipFactory(2);
        ship.hit(0);
        ship.hit(1);
        expect(ship.isSunk()).toBe(true);
    });

    it('returns false if ship is not fully hit', () => {
        const ship = shipFactory(2);
        ship.hit(0);
        expect(ship.isSunk()).toBe(false);
    });
});
