import React from "react";
import './home.css'
export default function Paginado({gamesPage, videogame, paginado}){
    const numbPage = [];

    for(let i = 0 ; i <=Math.ceil(videogame/gamesPage); i++){
        numbPage.push(i+1)
    }
    return (
        <nav >
            <ul  className='pages'>
                {
                    numbPage && numbPage.map(number =>(
                        <li key ={number} >
                        <a className='pagina' onClick={()=>{paginado(number)}}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>

    )
}






/*
import { useDispatch } from "react-redux"
import { sort } from "../store/action"
import { ASCENDENTE, DESCENDENTE } from "./constantes/sort"

export default function Order(){
   let dispatch = useDispatch()
    function onSelectChange(e){
        dispatch(sort(e.target.value))
    }
    return <select name="select" onChange={onSelectChange}>
        <option value={ASCENDENTE}>ascendente</option>
        <option value={DESCENDENTE}>descendente</option>
    </select>
} 
*/
//<option value="id">ID</option>