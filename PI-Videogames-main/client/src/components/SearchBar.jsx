import { useState } from "react"
//import axios from 'axios'
import { useDispatch } from "react-redux";
import { searchVideogames } from "../store/action";

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
    return <div>
        <form onSubmit={onSubmit}>
        <input  type="text" onChange={onInputChange} value={search} className='Search'/>
        <input type="submit" value="Buscar" className='SearchBoton'/>
        </form>
    </div>
}