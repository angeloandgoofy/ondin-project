import { useRef, useState, useEffect } from "react";
import { apiCall } from './apiCall'
import './Game.css'

function Game() {
    const [gameOn, setGameOn] = useState(true);
    const [count, setCount] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
        return parseInt(localStorage.getItem("BestScore")) || 0;
    });
    
    const apiData = apiCall(30);
    const [board, setBoard] = useState([]);
    
    const clickedSet = useRef(new Set());

    const checkWin = (element) => {
        if (clickedSet.current.has(element)) {
            setGameOn(false);
        } else {
            clickedSet.current.add(element);
            setCount(prevCount => prevCount + 1);
            randomBoard();
        }
    };

    const resetGame = () => {
        clickedSet.current.clear();
        setCount(0);
        setGameOn(true);
        randomBoard();
    };

    const shuffleBoard = () => {
        const shuffleArr = [...apiData];
        for(let i = shuffleArr.length -1; i >= 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]]
        }

        return shuffleArr;
    }
    const randomBoard = () => {
        setBoard(shuffleBoard());
    }

    useEffect(() => {
        if(apiData && apiData.length > 0 && board.length === 0){
            randomBoard();
        }
        if (count > bestScore) {
            setBestScore(count);
            localStorage.setItem("BestScore", count.toString());
        }
    }, [count, apiData, board.length]);
    
    if(apiData.length === 0 || !apiData){
       return <div>loading...</div>
    }

    return (
        <>
        <div className="scoreboard">
            <h1>Current Score:</h1>
            <h2>{count}</h2>
            <h1>Best Score:</h1>
            <h2>{bestScore}</h2>
        </div>
        <div >
            {gameOn ? (
                <div>
                {board.map((element,index) => {
                    return (
                    <button key={index} onClick={() => {
                        checkWin(element); 
                    }}>
                        <img src={element} alt="Pokemon" />
                    </button>
                    );

            })}
            </div>): (<div>
                <p> Game Over </p>
                <button onClick={() => resetGame()}>Reset</button>
            </div>)}
        </div>
        </>
    )
}

export default Game;
