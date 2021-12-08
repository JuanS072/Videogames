import { Link } from 'react-router-dom';
import './videogame.css';
export default function Gameinit(){
return <div className='landing'>
    <div className='button_container'>
    <Link to='/home'>
        <button  className='buttons'>Welcome to VideoGames </button>
    </Link>
    </div>
    <div className='containerlin'>
    <a href="https://www.linkedin.com/in/juansequeira/" target="_blank" className='linkedin'>My profile Linkedin
    <img alt="LinkedIn" width="25px" src="https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg" align="center"></img></a>
    </div>
    <div className='containerlin'>
    <a href="https://www.juancarlossequeira07@gmail.com" target="_blank" className='gmail'>My google Account
    <img alt="Gmail" width="25px" src="https://image.flaticon.com/icons/png/128/281/281786.png" align="center" ></img></a> 
    </div>
</div>
}


