const { json } = require('express');
var express = require('express');
var router = express.Router();
var novedadesModel = require('./../models/novedadesModel');
var cloudinary = require('cloudinary').v2;

router.get('/novedades', async function (req, res, next) {
    let novedades = await novedadesModel.getNovedades();

    novedades = novedades.map(novedades => {
        if (novedades.img_id) {
          const portada = cloudinary.url(novedades.img_id, {
            width: 200,
            height: 300,
            crop: 'fill',
          });
          return {
            ...novedades,
            portada
          }
        }else {
          return {
            ...novedades,
            portada: ''
          }
        }
      });

    res.json(novedades);
});

router.get('/producto/:titulo/:subtitulo/:id', async function (req, res, next) {
  let id = req.params.id;
  let producto = await novedadesModel.getNovedadesById(id);
  let portada = cloudinary.url(producto.img_id);

  producto = {
        ...producto,
        portada
    };
    

    res.json(producto);
  });

module.exports = router;