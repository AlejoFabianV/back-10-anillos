var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');

router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedaes();
  res.render('admin/novedades', {
    layout: 'admin/layout', 
    persona: req.session.nombre,
    novedades,
  });
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});

router.post('/agregar', async (req, res, next) => {
  try{
    if (req.body.titulo != '' && req.body.subtitulo != '' && req.body.descripcion != ''){
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    }else {
      res.render('admin/agregar' , {
        layout: 'admin/layout',
        error: true, 
        message: 'Todos los campos son requiridos'
      });
    }
  }catch (error) {
    console.log(error)
    res.render('admin/agregar' , {
      layout: 'admin/layout',
      error: true, 
      message: 'No se pudo agregar la novedad'
    });
  }
});

module.exports = router; 