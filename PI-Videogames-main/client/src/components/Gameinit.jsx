import { Link } from 'react-router-dom';
import './videogame.css';
export default function Gameinit(){
return <div className='Gameinit'>
<h1 className='h2init'>Welcome to VideoGames </h1>
    <div className='divboton'>
    <Link to='/home'>
        <button  className='Buttoninit'>Home</button>
    </Link>
    </div>
</div>
}

//<Link to='/home'> </Link>   className='fondo'   justify-content: center center;
