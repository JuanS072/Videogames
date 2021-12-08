
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIndb,fetchVideogames, filteredrating, filtergenres, sort, sortalgabetico } from "../store/action";
import { API, ASCENDENTE,  DATABASE, DESCENDENTE } from "./constantes/sort";
import Videogame from "./videogame";
import Paginado from "./pages";
import Nav from "./nav"
import './home.css'
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
   
 const [orden, setOrden] = useState('')

 const gen = useSelector((state) => state.filteredGenres);
 
 const ratin= useSelector((state) => state.filteredGames);
 
 
 
 function HandleFilterGenres(e){
 dispatch(filtergenres(e.target.value))
 }
 function handleclickalfa(e){
   dispatch(sortalgabetico(e.target.value))
   setOrden(`Ordenados${e.target.value}`)
   console.log(e.target.value, 'handlealfa')
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
 }

     return <div className='container2'>
       <Nav/>
       <div className='filternav'>
         
    <label  className='select'><input type='checkbox'
     name='alfabético' value='alfabético' onClick={e => handleclickalfa(e)}/>alfabético </label>

       <select onChange={e => HandleClickAsc(e)} className='select'>
     <option value='todos'>Todos</option>
      <option value={ASCENDENTE}>Ascendente</option>
      <option value={DESCENDENTE}>Descendente</option>
     </select>
     <select  onChange={e => HandlerFilterRating(e)}  className='select'>   
       <option value='todos'>Todos</option>             
       <option value = 'ratinga'>Rating max</option>
       <option value = 'ratingb'>Rating min</option>
     </select>
     <select onChange={e => HandlerFilterCreated(e)}  className='select'>
     <option value='todos'>Todos</option>
     <option value={API}>Existente</option>
     <option value={DATABASE}>Creado</option>
     </select>

     <select  onChange={e => HandleFilterGenres(e)} className='select'>                
                {gen.length>0? (gen?.map(el=> {
                            return<option value={el.name}> {el.name} </option>
                          })
                          ) :
                          (
                              <option>loading...</option>
                          )}
     </select>
       </div>
       <div className='paginado'>
       <Paginado
       gamesPage={gamesPage}
       videogame={videogame.length}
       paginado={paginado}
       />
       </div>
        {currentGamesPage.length > 0 ? 
            <div className='flexItem'> 
                {currentGamesPage.map((e) => {
                    return <Videogame name={e.name}
                     image={e.image} platforms={e.platforms} 
                    genero={e.genero} rating={e.rating} id ={e.id} />
                })}     
            </div>    
            : 
            <div className='novideogame'>
                <h2>LOADING...</h2>
                <h4> If persists more than 15 seconds: </h4>
                <h4> Sorry! There is no match for your search. </h4>
                <img className='photo' src="https://preview.redd.it/zqqvyy6rtll61.png?auto=webp&s=c0893407ab92d129cba70a606e9e64b5afe014e7" alt="SadMarioBross" />
            </div>
            } 
 <div className='paginado'>
       <Paginado
       gamesPage={gamesPage}
       videogame={videogame.length}
       paginado={paginado}
       />
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