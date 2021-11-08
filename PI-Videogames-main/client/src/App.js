import { Route, Switch } from 'react-router';
//import './App.css';
//import Order from './components/order';
import Gameinit from './components/Gameinit';
import Home from './components/Home';
import './components/videogame.css';
import { BrowserRouter } from 'react-router-dom';
import Details from './components/Details';
import VideogameCreate from './components/CreatedVid';







function App() {
  return (<BrowserRouter>
    <div >
        <Switch>
      <Route exact path="/" component={Gameinit}/>
      <Route path="/home" component={Home}/>
      <Route path="/videogame" component={VideogameCreate}/>
      <Route path="/videogames/:id" component={Details}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;


/*
Frontend
Se debe desarrollar una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

Pagina inicial: deben armar una landing page con:
A) Alguna imagen de fondo representativa al proyecto
B) Botón para ingresar al home (Ruta principal) //  soluccionar aparece la imagen en todo 
// y el boton tambien

Ruta principal: debe contener
1)Input de búsqueda para encontrar videojuegos por nombre //HECHOO

Área donde se verá el listado de videojuegos. Deberá mostrar su:
Imagen   //HECHOO
Nombre //HECHOO
Géneros //FALTAA
Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros //FALTA
//FILTRAR POR GENERO O AGREGADO POR NOSOTROS

Botones/Opciones para ordenar tanto ascendentemente como  //DESC Y ASCEN HECHOOS 
 descendentemente los videojuegos por orden alfabético y por rating 
 //FALTAA ORDEN ALFABETICO Y RATIN
//FALTA TODO EL PAGINADO
Paginado para ir buscando y mostrando los siguientes videojuegos,
  15 juegos por pagina, mostrando los primeros 15 en la primer pagina.



  <Route
    path='/Home'
    render={()=><Gameinit/>}
  />

import './App.css';
import Videogames from './components/videogames';


function App() {
  return (
    <div className="App">
     <Videogames/>
    </div>
  );
}

export default App;

function App() {
  return (
    <div className="App">
      <Gameinit/>
    </div>
  );
}

export default App;
 <Route
      exact path='/videogames/:idVideogame'
      render={({match}) =>{ return <Details Games={onFilter(match.params.GameId)}/>}}
/>

<Route path="/videogames/:id" component={Details}/>
*/ 

//API KEY
//6e83385c0cc849f7858ba0caf52e5df3
//"image":"https://i.blogs.es/594843/chrome/450_1000.jpg"
