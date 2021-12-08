import { Link } from "react-router-dom";
import './videogame.css'
export default function Videogame({name, image, genero, rating, id}){
    return  <div className='flexcontainer'>
    <span className='title'>{name}</span>
    <div>
        <img className='image' src={image} alt="VideogameImage" />
    </div>
    <div>
        <span className='genres'>{genero}</span>
    </div>
    <span className='rating'>{rating}</span>
    <div className='divlink'>
        <Link className='link' to={`/videogames/${id}`}>More details</Link>
    </div>
    </div>
}

