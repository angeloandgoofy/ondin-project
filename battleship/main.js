import Players from './Player.js';
const {Player, Computer} = Players;

const DomController = (function() {
    let player1 = Player();
    player1.gameboard.putShipOnBoard();
    let Machine = Computer();
    Machine.gameboard.putShipOnBoard();

    const size = 10;
    let PlayerTurn = true;
    let GameWinner = false;
    let GameStart = false;
    function DisplayBoard(boardD, isPlayerBoard = false){
        const board = document.querySelector(isPlayerBoard ? ".HumanBoard" : ".ComputerBoard");
        board.innerHTML = '';

        for(let i = 0; i < size; i++){
            const row = document.createElement('div');
            row.classList.add('row');

            for(let j = 0; j < size; j++){
                const cell = document.createElement("div");
                let cellData = boardD[i][j];
                cell.classList.add('cell');
              
                if(cellData === 'missed'){
                    cell.textContent = "💦";
                    cell.style.backgroundColor = "lightblue";
                }else if(cellData && typeof cellData === 'object' && cellData.ship){
                    if(isPlayerBoard){
                        if(cellData.ship.hits[cellData.index]){
                            cell.textContent = cellData.ship?.isSunk() ? '💥' : '🎯'
                            cell.style.backgroundColor = cellData.ship?.isSunk() ? "darkred" : "red";
                        }else{
                            cell.textContent = '🚢';
                            cell.style.textAlign = 'center';
                            cell.style.fontSize = 'medium';
                        }
                    }else{
                        if(cellData.ship.hits[cellData.index]){
                            cell.textContent = cellData.ship?.isSunk() ? '💥' : '🎯'
                            cell.style.backgroundColor = cellData.ship?.isSunk() ? "darkred" : "red";
                        }else{
                            cell.textContent = '~';
                            cell.style.textAlign = 'center';
                            cell.style.fontSize = 'medium';
                        }
                    }
                }else {
                    cell.textContent = '~';
                    cell.style.textAlign = 'center';
                    cell.style.fontSize = 'medium';
                }
                 
             
                if(!isPlayerBoard){
                    cell.addEventListener('click', () => HumanAttack(i,j));
                }
                row.append(cell);
            }
            board.append(row);
        }
    }

    window.resetGame = function() {
        player1 = Player();
        Machine = Computer();

        player1.gameboard.putShipOnBoard();
        Machine.gameboard.putShipOnBoard();

        GameStart = false;
        GameWinner = false;
        PlayerTurn = true;

        InitializeGame(false);
    };



    window.RandShip = function () {
        if(!GameStart){
            let humanBoard = resetBoard(player1.gameboard.getBoard());
            let machineBoard = resetBoard(Machine.gameboard.getBoard());
            player1.gameboard.putShipOnBoard();
            Machine.gameboard.putShipOnBoard();
            InitializeGame(false);
        }
    }

    const resetBoard = (board) => {
        for (let i = 0; i < board.length; i++) {
            board[i].fill(null);
        }
    }
    const InitializeGame = (GameS) => {
        let HumanInfo = player1.gameboard.getBoard();
        let ComputerInfo = Machine.gameboard.getBoard();
        if(GameS){
            GameStart = true;
            DisplayBoard(HumanInfo, true);
            DisplayBoard(ComputerInfo, false);
        }else{
            DisplayBoard(HumanInfo, true);
            DisplayBoard(ComputerInfo, false);
        }
            
    }

    const HumanAttack = (row, col) => {
        if(!PlayerTurn || !GameStart) {
            return;
        }
        if(GameWinner){
            return;
        }
        
        const attack = Machine.gameboard.receiveAttack(row, col);
    
        if(attack === 'already missed' || attack === 'already hit'){
            return;
        }
        PlayerTurn = false;
        const boardInfo = Machine.gameboard.getBoard();
        DisplayBoard(boardInfo, false);
        if(Machine.gameboard.allShipSunk()){
            GameWinner = true;
        }
        setTimeout(ComputerMove, 1000);
    }
    
    const ComputerMove  = () => {
        if(GameWinner){
            return;
        }
        let row, col, attack;
        let attempts = 0, maxAttempts = 100;
        do{
            row = Math.round(Math.random() * 9);
            col = Math.round(Math.random() * 9);
            attack = player1.gameboard.receiveAttack(row, col);
            attempts++;
        }while((attack === 'already hit' || attack === 'already missed') && attempts < maxAttempts);

        if(attempts >= maxAttempts){
            outer: for(let r = 0; r < 10; r++){
                for(let c = 0; c < 10; c++){
                    let cell = player1.gameboard.getBoard()[r][c];
                    if(cell !== 'missed' && !(cell && typeof cell === 'object' && cell.ship.hit[cell.index])){
                        const result = player1.gameboard.receiveAttack(r, c);
                        break outer;
                    }
                }
            }
        }

        const boardInfo = player1.gameboard.getBoard();

        DisplayBoard(boardInfo, true);
        if(player1.gameboard.allShipSunk()){
            GameWinner = true;
        }
        PlayerTurn = true;
    }
    return{
        InitializeGame,
    }
});


let game = DomController();
game.InitializeGame(false);

document.getElementById('start').addEventListener('click', ()=>{
    game.InitializeGame(true);
})