const { Router } = require('express');
const {Genres, Videogame} = require('../db')
const axios = require('axios');
const {
    MY_APIKEY
   } = process.env;
const router = Router();

router.get('/genres', async (req, res, next)=>{
    let apigenres = await axios.get(`https://api.rawg.io/api/genres?key=${MY_APIKEY}`)

   apigenres.data.results.forEach(async (el)=>{
       await Genres.findOrCreate({
           where:{ name: el.name}
       })
   });
  const allGeneres= await Genres.findAll();
   res.send(allGeneres);
 })




module.exports = router;


/*
GET https://api.rawg.io/api/genres

[ ] GET /genres:///HECHOOO
Obtener todos los tipos de géneros de videojuegos posibles
----------------------------------
///HECHOOO
En una primera instancia deberán traerlos desde rawg y 
guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get('/', async (req, res, next)=>{
    try{
        const genero = await Genres.findAll();
        res.send(genero)
    }catch(error){
        next(error);
    }
})

------------------------------------------------------------------
router.get('/genres', (req, res, next)=>{
    const generesApi =  axios.get(`https://api.rawg.io/api/genres?key=${MY_APIKEY}`)
    const generesDB = Genres.findAll({
        include: Videogame,
    })
    Promise.all([generesApi, generesDB])
//-------------------------------------
.then((respuesta)=>{
        const [generesApi, generesDB] = respuesta;
        let generesfiltered = generesApi.data.results.map((genero)=>{
            return{
                id: genero.id,
                name: genero.name,
                image_background: genero.image_background,
                games: genero.games,
                generos:genero.genres
                
            }
        }) 
        let allGeneres = [...generesfiltered, ...generesDB]
        res.status(401).send(allGeneres)
    })
    .catch((error)=>{
        next(error)
    })
})
router.get('/genres', async (req, res, next)=>{
   let apigenres = await axios.get(`https://api.rawg.io/api/genres?key=${MY_APIKEY}`)
  apigenres.data.results.forEach(async (el)=>{
      await Genres.findOrCreate({
          where:{ name: el.name}
      })
  });
  const allGeneres= await Genres.findAll();
  console.log(allGeneres,'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  res.send(allGeneres);
})
-------------------------------------------------------------------------------


router.get('/videogames', async (req, res, next)=>{
    try{
   let apigenres = axios.get(`https://api.rawg.io/api/games?key=${MY_APIKEY}&page_size=40&page=1`)
   let gamebd = await Genres.findAll({
    includes: {
        model: Videogame,
        attributes: ["name"],
        through: {
            attributes: []
        }
    }
})
   
   var promesas = await Promise.all([apigenres, gamebd])
   promesas = promesas.map(p =>p.data.results)
   
   let get = promesas.flat().map(genero => {
       return {
        id: genero.id,
        name: genero.name,
        image_background: genero.image_background,
        games: genero.games,
        generos:genero.genres
       }
     })
    
   res.send(get)
    } catch(error) {
        next(error)
    }
   })                   
*/