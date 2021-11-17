const { Router } = require('express');
const videoRoute = require('./videogame')
const Routegene = require('./gamegenere')

//const express = require('express')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use(express.json());
router.use('/api', videoRoute);

router.use('/api', Routegene);


module.exports = router;
