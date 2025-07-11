import shipFactory from './ship.js'

class Gameboard {
    shipXL = shipFactory(5);
    shipL = shipFactory(4);
    shipM = shipFactory(3);
    shipM1 = shipFactory(3);    
    shipS = shipFactory(2);
    missedAttacks = [];


    gameboard = new Array(10).fill(null).map(() => new Array(10).fill(null));

    constructor() {}

    getBoard(){
        return this.gameboard;
    }
    
    putShipOnBoard() {
        let ships = [
            { name: "shipXL", orientation: Math.round(Math.random() * 1) ? 'vertical' : "horizontal" },
            { name: "shipL", orientation: Math.round(Math.random() * 1) ? 'vertical' : "horizontal"  },
            { name: "shipM", orientation: Math.round(Math.random() * 1) ? 'vertical' : "horizontal"  },
            { name: "shipM1", orientation: Math.round(Math.random() * 1) ? 'vertical' : "horizontal" },
            { name: "shipS", orientation: Math.round(Math.random() * 1) ? 'vertical' : "horizontal"  }
        ];

        let count = 0;
        while(count < ships.length){
            let x = Math.round(Math.random() * 9);
            let y = Math.round(Math.random() * 9);
            if(this.canPlaceShip(ships[count], x, y, ships[count].orientation)){
                if (ships[count].orientation === 'vertical') {
                    for (let i = y; i < y + this[ships[count].name].length; i++) {
                        this.gameboard[x][i] = {ship: this[ships[count].name], index: i - y};
                    }
                } else {
                    for (let i = x; i < x + this[ships[count].name].length; i++) {
                        this.gameboard[i][y] = {ship: this[ships[count].name], index: i - x};
                    }
                }
                count++;
            }
        }
    }

    canPlaceShip(ship, row, col, orientation){
        let length = this[ship.name].length;
        if(orientation == 'vertical'){
            if(col + length <= this.gameboard.length){
                for(let i = col; i < length + col; i++){
                    if(this.gameboard[row][i] !== null){
                        return false;
                    }
                }
                return true;
            }
        }else{
            if(row + length <= this.gameboard.length){
                for(let i = row; i < row + length; i++){
                    if(this.gameboard[i][col] !== null){
                        return false;
                    }
                }
                return true;
            }
        }
    }

    receiveAttack(x, y){
        if(x < 0 || x >= this.gameboard.length || y < 0 || y >= this.gameboard.length){
            return;
        }
        let cell = this.gameboard[x][y];
        if(cell === 'missed'){
            return 'already missed';
        }
        if(cell && typeof cell === 'object' && cell.ship && typeof cell.index === 'number'){
            if(!cell.ship.hits[cell.index]){
                cell.ship.hit(cell.index);
                return 'hit';
            }else {
                return 'already hit';
            }
        }
        this.gameboard[x][y] = 'missed';
        this.missedAttacks.push([x,y]);
        return 'miss';

    }

    allShipSunk(){
        if(this.shipXL.isSunk() && this.shipL.isSunk() && this.shipM.isSunk()
        && this.shipM1.isSunk() && this.shipS.isSunk()){
            return true;
        }
        return false;
    }
}


export default Gameboard;