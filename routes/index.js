var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Conexion database
var mongoose = require('mongoose');
//Models
var Tasks = mongoose.model('Tasks');

//GET - List Tasks
router.get('/tasks'), function(req, res, next){
  Tasks.find(function(err, tasks){
    if(err){return next(err)}

    res.json(tasks);
  })
}

module.exports = router;
