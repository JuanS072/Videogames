import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { createIndb, fetchGenres, fetchVideogames, filteredrating, filtergenres, sort, sortalgabetico } from "../store/action";
import { API, ASCENDENTE,  DATABASE, DESCENDENTE } from "./constantes/sort";
import SearchBar from "./SearchBar";
import "./videogame.css";

function Nav() {
  let dispatch = useDispatch()
  const [orden, setOrden] = useState('')

const gen = useSelector((state) => state.filteredGenres);


useEffect(() => {
 dispatch(fetchGenres());
},[dispatch])

const ratin= useSelector((state) => state.filteredGames);



function HandleFilterGenres(e){
dispatch(filtergenres(e.target.value))
}
function handleclickalfa(e){
  dispatch(sortalgabetico(e.target.value))
  setOrden(`Ordenados${e.target.value}`)
  console.log(e.target.value, 'handlealfa')
} 

  function HandleClick(e){
    e.preventDefault()
   dispatch(fetchVideogames())
 }  
function HandleClickAsc(e){
 e.preventDefault()
   dispatch(sort(e.target.value))
   setOrden(`Ordenado${e.target.value}`)
 }


function HandlerFilterCreated(e){
 dispatch(createIndb(e.target.value))
}

function HandlerFilterRating(e){
dispatch(filteredrating(e.target.value))
console.log(e.target.value,'target')
}


  return (
    <nav className='navbar'>
     <Link to='/' className='h1h3'>  <h1>Videogames</h1> </Link>
    <Link to='/videogame' className='h1h'><h3>Crear Juego</h3></Link>
    <button onClick={e =>{HandleClick(e)}}className='Button' >Reload Page</button>
    <label><input type='checkbox'
     name='alfabético' value='alfabético' onClick={e => handleclickalfa(e)}/>alfabético </label>

       <select onChange={e => HandleClickAsc(e)} className='OrdenNav2'>
     <option value='todos'>Todos</option>
      <option value={ASCENDENTE}>Ascendente</option>
      <option value={DESCENDENTE}>Descendente</option>
     </select>
     <div>
     <SearchBar/>
     <select  onChange={e => HandlerFilterRating(e)} className='OrdenNav' >                
                {ratin.length > 0? (ratin?.map(el=> {
                            return<option value={el.rating}> {el.rating} </option>
                          })
                          ) :
                          (
                              <option>loading...</option>
                          )}
     </select>
     <select onChange={e => HandlerFilterCreated(e)} className='OrdenNav' >
     <option value='todos'>Todos</option>
     <option value={API}>Existente</option>
     <option value={DATABASE}>Creado</option>
     </select>

     <select  onChange={e => HandleFilterGenres(e)} className='OrdenNav' >                
                {gen.length>0? (gen?.map(el=> {
                            return<option value={el.name}> {el.name} </option>
                          })
                          ) :
                          (
                              <option>loading...</option>
                          )}
     </select>
    </div>
    </nav>
  );
};

export default Nav;





/*

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideogames} from "../store/action";
import Videogame from "./videogame";
import Paginado from "./pages";
import Nav from "./nav"
 export default function Home(){
   let videogame = useSelector((state)=> state.filteredGames)
   let dispatch = useDispatch()
   const [currentpage, setCurrenpage] = useState(1);
   const [gamesPage, setGamespage] = useState(15)
  const indiceLastGames = currentpage * gamesPage;
  const indiceFirstGames = indiceLastGames - gamesPage
  const currentGamesPage = videogame.slice(indiceFirstGames, indiceLastGames)

  const paginado = (pagnum)=>{
    setCurrenpage(pagnum)
  }

   useEffect(()=>{
       dispatch(fetchVideogames())
   }, [])


     return <div>
       <Nav/>
       <div className='DivHome'>
       <Paginado
       gamesPage={gamesPage}
       videogame={videogame.length}
       paginado={paginado}
       />
       {
      currentGamesPage?.map(e=>{
         return <div className='column'>
         <Videogame name={e.name} image={e.image} platforms={e.platforms} genre={e.genero} rating={e.rating} id ={e.id} />
         </div>
        
       })
       }
   </div>
  </div>
 }

*/