import { Link } from 'react-router-dom';
import './videogame.css';
export default function Gameinit(){
return <div className='landing'>
    <div className='button_container'>
    <Link to='/home'>
        <button  className='buttons'>Welcome to VideoGames </button>
    </Link>
    </div>
</div>
}


