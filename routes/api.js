const { json } = require('express');
var express = require('express');
var router = express.Router();
var novedadesModel = require('./../models/novedadesModel');
var cloudinary = require('cloudinary').v2; 
var nodemailer = require('nodemailer');

router.get('/novedades', async function (req, res, next) {
    let novedades = await novedadesModel.getNovedades();
    novedades = novedades.map(novedades => {
        if (novedades.img_id) {
          const portada = cloudinary.url(`https://res.cloudinary.com/dbouwy1jn/image/upload/${novedades.img_id}`, {
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
  let portadaById = cloudinary.url(producto.img_id);
  producto = {
        ...producto,
        portadaById
    };
    
    res.json(producto);
  });

router.post('/contacto', async (req, res) => {
  const mail = {
    to: 'verhagenalejo@gmail.com' ,
    subject: 'Contacto web desde la pagina los 10 anillos',
    html: `${req.body.nombre} se contacto a traves de la web, su mail de contacto es:
    ${req.body.email} <br>. Su mensaje o consulta fue: ${req.body.mensaje}` 
  }

  var contactoWeb = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await contactoWeb.sendMail(mail)

  res.status(201).json({
    error: false,
    message: 'Su mensaje a sido envido con exito, gracias por contactarnos!'
  })

});

module.exports = router;