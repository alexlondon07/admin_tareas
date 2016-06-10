angular.module('appTareas', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('alta', {
                url: '/alta',
                templateUrl: 'views/alta.html',
                controller: 'ctrlAlta'
            })
            .state('editar', {
                url: '/editar',
                templateUrl: 'views/editar.html',
                controller: 'ctrlEditar'
            });

        $urlRouterProvider.otherwise('alta');
    })
    .factory('comun', function($http) {
        var comun = {} 
        comun.tasks = [];

        comun.task = {};

        /**
         * Remote methods section
         */
         comun.getAll = function(){
           return $http.get('/tasks')
           .success(function(data){
             angular.copy(data, comun.tasks)

             return comun.tasks;
           })
         }
         //Add Task
         comun.add = function(task){
           return $http.post('/task', task)
           .success(function(task){
             comun.tasks.push(task);
           })
         }

         //Update task
         comun.update = function(task){
           return $http.put('/task/' + task._id, task)
           .success(function(data){
             var index = comun.tasks.indexOf(task);
             comun.tasks[index] = data;//Update datas
           })
         }

         //Delete task
         comun.delete = function(task){
           return $http.delete('/task/' + task._id)
           .success(function(){
             var index = comun.tasks.indexOf(task);
             comun.tasks.splice(index, 1);
           })
         }

        return comun;
    })
    .controller('ctrlAlta', function($scope, $state, comun) {
        $scope.task = {}

        comun.getAll();

        $scope.tasks = comun.tasks;

        $scope.priorityes = ['Low', 'Normal', 'High'];

        //function add new task for my list
        $scope.add = function() {
            //Validate fields
            comun.add({
                  name: $scope.task.name,
                  priority: parseInt($scope.task.priority)
              })
              //Empty fields
              $scope.task.name = '';
              $scope.task.priority = '';
        }

        //More priority
        $scope.morePriority = function(task) {
            task.priority += 1;
        }

        //Less priority
        $scope.lessPriority = function(task) {
            task.priority -= 1;
        }

        //Delete one task
        $scope.delete = function(task) {
            comun.delete(task);
        }

        //Process Object for Edit
        $scope.processObject = function(task){
          comun.task = task;
          $state.go('editar');
        }


        $scope.option = [{
          name: "Low",
          value: 0,
        },{
          name: "Normal",
          value: 1,
        },{
          name: "High",
          value: 2,
        }];

    })
    .controller('ctrlEditar', function($scope, $state, comun) {
        $scope.task = comun.task;

        //function for edit task
        $scope.update = function(){
          comun.update($scope.task);
          $state.go('alta');
        }

        //function delete task
        $scope.delete =function(){
          comun.delete($scope.task);
          $state.go('alta');
        }
    })
