const { Router } = require('express');
const {Videogame, Genres} = require('../db')
const {Op}= require('sequelize')
const {v4: uuidv4}= require('uuid');
const axios = require('axios');
const {
   MY_APIKEY
  } = process.env;
const router = Router();

/*
[] GET /videogames:///HECHOOO
Obtener un listado de los videojuegos
Debe devolver solo los datos necesarios para la ruta principal 
*/
/*
[ ] GET /videogames?name="...":///HECHOOO
Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
Si no existe ningún videojuego mostrar un mensaje adecuado
*/

router.get('/videogames', async (req, res, next)=>{
    try{
    let name = req.query.name;
    let apiuno;
    let apidos;
    let apitres;
    let gamebd ;
  if(name){          
    apiuno = axios.get(`https://api.rawg.io/api/games?search=${name}&key=${MY_APIKEY}&page_size=40&page=1`)
    apidos= axios.get(`https://api.rawg.io/api/games?search=${name}&key=${MY_APIKEY}&page_size=40&page=2`)
    apitres =  axios.get(`https://api.rawg.io/api/games?search=${name}&key=${MY_APIKEY}&page_size=20&page=3`)
   
        gamebd = await Videogame.findAll({
        include: Genres ,
        where:{
            name: {
                [Op.iLike]: "%" + name + "%"
            }
        },
        order:[
            ['name', 'ASC'],
        ],
    })
   
    }else{
    apiuno = axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page_size=40&page=1`)
    apidos= axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page_size=40&page=2`)
    apitres=  axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page_size=20&page=3`)

     gamebd = await Videogame.findAll({
       includes: {
           model: Genres,
           attributes: ["name"],
           through: {
               attributes: []
           }
       }
   })
}
var promesas = await Promise.all([apiuno, apidos, apitres])
   promesas = promesas.map(p =>p.data.results)
   
   let get = promesas.flat().map(games => {
       return {
           id:games.id,
           name: games.name,
           date: games.released,
           rating: games.rating_top,
           description: games.description,
           platforms: games.platforms.map(plat => plat.platform.name),
           image: games.background_image,
           genero: games.genres.map(genre => genre.name)
       }
     })
 const concats = gamebd.concat(get)
 res.send(concats)
    } catch(error) {
        next(error)
    }
   })


/*
[ ] POST /videogame:///HECHOOO
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos
*/
router.post('/videogame', async (req, res, next)=>{
    try {
        const {name , image, Descripción, rating, platforms, released, createinBD, genero}= req.body
      
    const newVideojuego = await Videogame.create({
        name,
        image,
        genero,
        id: uuidv4(),
        Descripción,
        released,
        rating,
        platforms:[platforms],
        createinBD: true
    })
     res.send(newVideojuego)
    } catch(error) {
        next(error)
    }
    
})

/*
[ ] GET /videogame/{idVideogame}:///HECHOOO
Obtener el detalle de un videojuego en particular
Debe traer solo los datos pedidos en la ruta de detalle de videojuego
----------------------------------
//HAY QUE REVISAR SI LOS TRAE
Incluir los géneros asociados
*/
//let idVideogame;
router.get('/videogames/:idVideogame', async (req, res, next)=>{
    try {
    const idVideogame = req.params.idVideogame;
    let juegos
    if(typeof idVideogame === 'string' && idVideogame.length > 8){
        juegos = await Videogame.findByPk(idVideogame)
        res.send(juegos)
    }else{
        juegos = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${MY_APIKEY}`)
        juegos = juegos.data;
        juegos = {
            id: juegos.id,
            name: juegos.name,
            released: juegos.released,
            image: juegos.background_image,
            platforms: juegos.platforms.map(e => e.platform.name),
            Descripción: juegos.description,
            rating: juegos.rating,
            ratings: juegos.ratings ,
            genero : juegos.genres.map(genre => genre.name)
        }
    }
    res.send(juegos)
    }catch(error){
        next(error)
}
})
module.exports = router;


//-----------------------------------------------
/*


router.get('/videogames', async (req, res, next)=>{
    try{
   let apiuno = axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page_size=40&page=1`)
   let apidos= axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page_size=40&page=2`)
   let apitres=  axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page_size=20&page=3`)
   
   var promesas = await Promise.all([apiuno, apidos, apitres])
   promesas = promesas.map(p =>p.data.results)
   
   let get = promesas.flat().map(games => {
       return {
           id:games.id,
           name: games.name,
           date: games.released,
           rating: games.rating_top,
           description: games.description,
           platforms: games.platforms.map(plat => plat.platform.name),
           image: games.background_image,
           genre: games.genres.map(genre => genre.name)
       }
     })
     let gamebd = await Videogame.findAll({
       includes: {
           model: Genres,
           attributes: ["name"],
           through: {
               attributes: []
           }
       }
   })
   const concats = gamebd.concat(get)
   res.send(concats)
    } catch(error) {
        next(error)
    }
   })


router.get('/videogames?name=', async (req, res, next)=>{
    try{
        let name = req.query.name;
   let apiuno = axios.get(`https://api.rawg.io/api/games?search=${name}&key=${MY_APIKEY}&page_size=40&page=1`)
   let apidos= axios.get(`https://api.rawg.io/api/games?search=${name}&key=${MY_APIKEY}&page_size=40&page=2`)
   let apitres=  axios.get(`https://api.rawg.io/api/games?search=${name}&key=${MY_APIKEY}&page_size=20&page=3`)
   
   var promesas = await Promise.all([apiuno, apidos, apitres])
   promesas = promesas.map(p =>p.data.results)
   
   let get = promesas.flat().map(games => {
       return {
           id:games.id,
           name: games.name,
           date: games.released,
           rating: games.rating_top,
           description: games.description,
           platforms: games.platforms.map(plat => plat.platform.name),
           image: games.background_image,
           genre: games.genres.map(genre => genre.name)
       }
     })
     let gamebd = await Videogame.findAll({
        include: Genres ,
        where:{
            name: {
                [Op.iLike]: "%" + name + "%"
            }
        },
        order:[
            ['name', 'ASC'],
        ],
    })
   const concats = gamebd.concat(get)
   res.status(401).send(concats)
    } catch(error) {
        next(error)
    }
   })
*/
//----------------------------------------------


//--------------------------------------------------------------------------------------------------
/* 
router.get('/videogames', async (req, res, next)=>{
 let promises = [axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}`), axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=2`),
    axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=3`),axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=4`), axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=5`)]
 let DataBase = Videogame.findAll({
        include: Genres ,
        where: {
            model: Genres,
            attributes:['name'],
            through:{
                attributes:[],
            },
       } 
    })  
    Promise.all([promises, DataBase])
      .then((respuesta)=>{
        const [juegosApi, juegosDB] = respuesta
        let juegosfiltered = juegosApi.data.results.map((juego)=>{
            return{
                id: juego.id,
                name: juego.name,
                image: juego.background_image,
                Descripción: juego.Descripción,
                rating: juego.rating,
                platforms: juego.platforms.map(e => e.platform.name),
                ratings: juego.ratings,
                released: juego.released
            }
        })  
        let allGames = [...juegosfiltered, ...juegosDB]
    // let allGamesLimit = allGames.slice(0,15);
        res.send(allGames)
    })
    .catch((error)=>{
        next(error)
    })
})
------------------------------------------------------------------------------------------
router.get('/videogames', async (req, res, next)=>{
  let promises = [axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}`), axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=2`),
    axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=3`),axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=4`), axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=5`)]
    let DataBase = Videogame.findAll({
        include: Genres ,
        where: {
            model: Genres,
            attributes:['name'],
            through:{
                attributes:[],
            },
       } 
    })
    let result = await Promise.all([promises, DataBase])
    result= result.map(i => i.data.results)

    let get = result.flat().map(games =>{
        return {
            name: games.name,
            date: games.released,
            rating: games.rating_top,
            description:games.description,
            platforms: games.platforms.map(e => e.platform.name),
            image: games.background_image,
            genre: games.genres.map(genre => genre.name),
        }
    })
    res.send(get);
})
------------------------------------------------------------------------------------------
router.get('/videogames', (req, res, next)=>{
   let name = req.query.name;
   let juegospromiseApi
   let juegospromiseDB
    if(name){          
        juegospromiseApi = axios.get(`https://api.rawg.io/api/games?search=${name}&key=${MY_APIKEY}`)
        juegospromiseDB = Videogame.findAll({
           include: Genres ,
           where:{
               name: {
                   [Op.iLike]: "%" + name + "%"
               }
           },
           order:[
               ['name', 'ASC'],
           ],
       })
    }else{
        juegospromiseApi = [axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}`), axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=2`),
        axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=3`),axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=4`), axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=5`)]
        juegospromiseDB = Videogame.findAll({
           include: {
             model: Genres,
             attributes:['name'],
             through:{
                 attributes:[],
             },
        } 
       })
    }
    Promise.all([juegospromiseApi, juegospromiseDB])
    .then((respuesta)=>{
        const [juegosApi, juegosDB] = respuesta
        let juegosfiltered = juegosApi.data.results.map((juego)=>{
            return{
                id: juego.id,
                name: juego.name,
                image: juego.background_image,
                Descripción: juego.Descripción,
                rating: juego.rating,
                platforms: juego.platforms.map(e => e.platform.name),
                ratings: juego.ratings,
                released: juego.released
            }
        })  
        let allGames = [...juegosfiltered, ...juegosDB]
    // let allGamesLimit = allGames.slice(0,15);
        res.send(allGames)
    })
    .catch((error)=>{
        next(error)
    })
})

------------------------------------------------------------

router.get('/videogames', (req, res, next)=>{
    let name = req.query.name;
    let juegospromiseApi = axios.get(`https://api.rawg.io/api/games?search=${name}&key=${MY_APIKEY}`)
    let juegospromiseDB = Videogame.findAll({
        include: Genres ,
        where:{
            name: {
                [Op.iLike]: "%" + name + "%"
            }
        },
        order:[
            ['name', 'ASC'],
        ],
    })
    Promise.all([juegospromiseApi, juegospromiseDB])
    .then((respuesta)=>{
        const [juegosApi, juegosDB] = respuesta
        let juegosfiltered = juegosApi.data.results.map((juego)=>{
            return{
                id: juego.id,
                name: juego.name,
                image: juego.background_image,
                Descripción: juego.Descripción,
                rating: juego.rating,
                platforms: juego.platforms.map(e => e.platform.name),
                ratings: juego.ratings,
                released: juego.released
            }
        })  
        let allGames = [...juegosfiltered, ...juegosDB]
    // let allGamesLimit = allGames.slice(0,15);
        res.send(allGames)
    })
    .catch((error)=>{
        next(error)
    })
})

---------------------------------------------
router.get('/videogames', async (req, res, next)=>{
    let promises = [axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}`), axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=2`),
       axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=3`),axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=4`),
        axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page=5`)]
    let DataBase = Videogame.findAll({
           include: Genres 
       })  
       let result = await Promise.all([promises, DataBase])
      
   
       let get = result.data.results.flat().map(games =>{
           return {
               name: games.name,
               date: games.released,
               rating: games.rating_top,
               description:games.description,
               platforms: games.platforms.map(e => e.platform.name),
               image: games.background_image,
           }
       })
       console.log(get)
       let Todoslosjuegos = [...get, ...DataBase]
       console.log(Todoslosjuegos);
      
       res.send(Todoslosjuegos);
    })


*/




