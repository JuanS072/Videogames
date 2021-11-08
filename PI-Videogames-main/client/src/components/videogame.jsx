import { Link } from "react-router-dom";

//import './videogame.css'
export default function Videogame({name, image, genero, rating, id}){
    return <div className='card'>
        <Link to={`/videogames/${id}`} className='cards'>
        <img src={image} alt="imagen not Found" className='img' />
        <h2>{name}</h2>
        <h2>{genero}</h2>
        <h2>{rating}</h2>
        </Link>
    </div>
}