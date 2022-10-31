var express = require('express');
const { route } = require('./login');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/novedades', {
    layout: 'admin/layout', 
    persona: req.session.nombre
  });
});

module.exports = router; 