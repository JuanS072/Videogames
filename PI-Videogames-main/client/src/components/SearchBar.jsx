import { useState } from "react"
//import axios from 'axios'
import { useDispatch } from "react-redux";
import { searchVideogames } from "../store/action";
import './home.css';
export default function SearchBar(){
 const [search, setSearch] = useState('')
let dispatch = useDispatch()
 function onSubmit(e){
     e.preventDefault();
     dispatch(searchVideogames(search))
 }
 function onInputChange(e){
     e.preventDefault(e)
     setSearch(e.target.value)
 }
    return <div className='container'>
        <form onSubmit={onSubmit}>
        <input  className='searchbar' type="text" onChange={onInputChange} value={search} /> 
        <input className='button' type="submit" value="Buscar" />
        </form>
    </div>
}

// className='Search'
//className='SearchBoton'