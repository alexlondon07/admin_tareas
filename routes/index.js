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
router.get('/tasks', function(req, res, next){
  Tasks.find(function(err, tasks){
    if(err){return next(err)}

    res.json(tasks);
  })
})

//POST - Add Task
router.post('/task', function(req, res, next){
  var task = new Tasks(req.body);

  task.save(function(err, task){
    if(err){return next(err)}
    res.json(task);
  })
})


//PUT - Edit Task
router.put('/task/:id', function(req, res){
  Tasks.findById(req.params.id, function(err, task){
    task.name = req.body.name;
    task.priority =  req.body.priority;

    task.save(function(err){
      if(err){res.send(err)}

      res.json(task);
    })
  })
})

//DELETE - Task
router.delete('/task/:id', function(req, res){
  Tasks.findByIdAndRemove(req.params.id, function(err, task){
      if(err){res.send(err)}
      res.json({message: 'Task deleted.'});
  })
})


module.exports = router;
