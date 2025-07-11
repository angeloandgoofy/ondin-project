import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import '../styles/navBar.css'
import { useState, useEffect } from 'react';


export default function NavBar({count, setcount}) {
    
    const [theme, setTheme] = useState('light');
    const [isScrolling, setScrolling] = useState(false);

    useEffect(() => {
        const counts = sessionStorage.getItem("itemCounts")
        if(counts){
            const c = JSON.parse(counts);
            const total = Object.values(c).reduce((acc, curr) => acc + curr.count, 0);
            setcount(total);
        }        
    }, [count]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[]);

    return (
        <>
        <nav  className={`navContainer ${theme} ${isScrolling ? 'scrolled' : ''}`}>
            <IconButton>
                <Link to="/"><HomeIcon sx={{ color: red[500] }} /></Link>
            </IconButton>

            <IconButton>
                <Badge badgeContent={count} color='primary'>
                    <Link to="cart"><ShoppingCartIcon sx={{ color: red[500] }}/></Link>
                </Badge>
            </IconButton>

            <button className={`button ${theme}`} onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}>
                {theme === 'light' ? '☀️' : '🌙'}
            </button>
        </nav >
        </>
    )
}