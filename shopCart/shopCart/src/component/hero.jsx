import Image1 from '../assets/photoshoot.jpeg'
import { Link } from 'react-router-dom'
import '../styles/hero.css'

export default function Hero(){
    const image = [
        {id: 1, image: Image1},
    ]

    return ( 
        <>
            <div className="hero">
                {image.map((element) => 
                    <div key={element.id}>
                        <img src={element.image}/>
                        <div className="overlay"> 
                            <h1>Made with Care</h1>
                            <Link to="shop"><button className='oButton'>SHOP</button></Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}