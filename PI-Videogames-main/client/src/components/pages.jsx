import React from "react";

export default function Paginado({gamesPage, videogame, paginado}){
    const numbPage = [];

    for(let i = 0 ; i <=Math.ceil(videogame/gamesPage); i++){
        numbPage.push(i+1)
    }
    return (
        <nav>
            <ul  className='navul'>
                {
                    numbPage && numbPage.map(number =>(
                        <li key ={number} >
                        <span class="separador">| </span>
                        <a onClick={()=>{paginado(number)}}>{number}</a>
                        <span class="separador">| </span>
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