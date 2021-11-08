
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, fetchVideogames, filtergenres} from "../store/action";
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

     return <div className='DivHome'>
       <Nav/>
       <div >
       <Paginado
       gamesPage={gamesPage}
       videogame={videogame.length}
       paginado={paginado}
       />
       {
      currentGamesPage?.map(e=>{
         return <div className='column'>
         <Videogame name={e.name} image={e.image} platforms={e.platforms} genero={e.genero} rating={e.rating} id ={e.id} />
         </div>
        
       })
       }
   </div>
  </div>
 }






 /*

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createIndb, fetchVideogames, sort } from "../store/action";
import { API, ASCENDENTE, DATABASE, DESCENDENTE } from "./constantes/sort";
import Videogame from "./videogame";
import Paginado from "./pages";
import SearchBar from "./SearchBar";
 export default function Home(){
   let videogame = useSelector((state)=> state.filteredGames)
   let dispatch = useDispatch()
   const Gamesid = useSelector((state)=>state.Gamedetails)
   const [orden, setOrden] = useState('')
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

   function HandleClick(e){
     e.preventDefault()
    dispatch(fetchVideogames())
  }
function HandleClickAsc(e){
  e.preventDefault()
    dispatch(sort(e.target.value))
    setCurrenpage(1)
    setOrden(`Ordenado${e.target.value}`)
  }

function HandlerFilterCreated(e){
  dispatch(createIndb(e.target.value))
}

     return <div>
       <nav className='navbar'>
       <Link to='/videogame'>Crear Juego</Link>
       <h1>Videogames</h1>
       <button onClick={e =>{HandleClick(e)}}>Reload Page</button>
        <div >
         <SearchBar/>
        <select onChange={e => HandleClickAsc(e)}>
        <option value='todos'>Todos</option>
         <option value={ASCENDENTE}>Ascendente</option>
         <option value={DESCENDENTE}>Descendente</option>
        </select>
        <select onChange={e => HandlerFilterCreated(e)} >
        <option value='todos'>Todos</option>
        <option value={API}>Existente</option>
        <option value={DATABASE}>Creado</option>
        </select>
        <select>
       {
      Gamesid.id ? <div>
        <option>{!Gamesid.createinBD? Gamesid.genero + ' ' : Gamesid.genero?.map( el =>(<div key={el}>{el.name + (' ')}</div>) )}</option>

      </div>: <p>Loading...</p>
    }
       </select>
       </div>
       </nav>
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