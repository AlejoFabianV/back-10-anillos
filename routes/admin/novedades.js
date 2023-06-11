var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
var uploader = util.promisify(cloudinary.uploader.upload);
var destroy = util.promisify(cloudinary.uploader.destroy);

cloudinary.config({ 
  cloud_name: 'dbouwy1jn', 
  api_key: '969884313554882', 
  api_secret: '9K0Wv3KvzF0SqCJu5BjEIGG_rUQ' 
});

router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades().catch();

  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const portada = cloudinary.image(novedad.img_id, {
        width: 90,
        height: 120,
        crop: 'fill'
      });
      return {
        ...novedad,
        portada
      }
    }else {
      return {
        ...novedad,
        portada: ''
      }
    }
  })

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
    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      portada = req.files.portada;
      img_id = (await uploader(portada.tempFilePath)).public_id; 
    }

    if (req.body.titulo != '' && req.body.subtitulo != '' && req.body.descripcion != '' && req.body.precio != '' && req.body.stock != ''){
      await novedadesModel.insertNovedad({
        ...req.body,
        img_id
      });
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

router.get('/eliminar/:id', async (req, res, next) => {
  let id = req.params.id;
  let novedad = await novedadesModel.getNovedadesById(id);
  if (novedad.img_id) {
    await(destroy(novedad.img_id));
  }

  await novedadesModel.deleteNovedadById(id);
  res.redirect('/admin/novedades')
});

router.get('/editar/:id', async (req, res, next) => {
  let id = req.params.id;
  let novedad = await novedadesModel.getNovedadesById(id);
  res.render('admin/editar', {
    layout: 'admin/layout',
    novedad
  });
});

router.post('/editar', async (req, res, next) => {
  try {
    let img_id = req.body.img_original; 
    let borar_img_vieja = false;

    if (req.body.img_delete === "1") {
      img_id = null;
      borar_img_vieja = true;
    }else {
      if (req.files && Object.keys(req.files).length > 0) {
        portada = req.files.portada;
        img_id = (await uploader(portada.tempFilePath)).public_id;
        borar_img_vieja = true;
      }
    }
    if (borar_img_vieja && req.body.img_original) {
      await (destroy(req.body.img_original));
    }

    let obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.stock,
      img_id
    }

    await novedadesModel.editarNovedadesById(obj, req.body.id);
    res.redirect('/admin/novedades');

  } catch (error) {
    console.log(error)
    res.render('admin/editar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se pudo modificar la novedad'
    })
  }
});

module.exports = router; 