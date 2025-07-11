import { useState, useEffect} from "react";
import {  useNavigate } from "react-router-dom"; // Import useNavigate

import './home.css'

function home() {

    const [gameStart, setGameStart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(gameStart){
            navigate("/game")
        }
    }, [gameStart]);

    const GameRules = [
        {
            img: '🃏',
            description: 'Click on cards and memorize'
        },
        {
            img: '🧠',
            description: 'Click on different card'
        },
        {
            img: '⚡',
            description: 'If you click on the same card you lose'
        }
    ];

    return(
        <div className="Container"
        style={{
            borderRadius: '10px',
            boxShadow: `
                        0 0 50px rgba(6, 182, 212, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1),
                        0 20px 40px rgba(0, 0, 0, 0.8)
                    `,
            opacity: '80%',
            height: '90vh',
            maxWidth: '2400px',
            background: 'linear-gradient(145deg, rgba(17, 24, 39, 0.9), rgba(0, 0, 0, 0.9))'
        }}
        >
            <h1 style={{
                color: 'white',
                padding: '20px',

            }}>Memory Game</h1>
            <div style={{
                display:'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gridTemplateRows: 'auto'
            }}>
                {GameRules.map((element,index) => 
                    <div className="card" key={index}>
                        <h1>{element.img}</h1>
                        <p style={{
                        color: 'white'
                    }}>{element.description}</p>
                    </div>
                )}
            </div>
            
            <button onClick={() => setGameStart(true)}>Start</button>
        </div>
    )
}

export default home;