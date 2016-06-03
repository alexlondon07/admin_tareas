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
    .factory('comun', function() {
        var comun = {}
        comun.tasks = [{
            name: 'Comprar comida',
            priority: '1'
        }, {
            name: 'Pasear al perro',
            priority: '2'
        }, {
            name: 'Ir al cine',
            priority: '0'
        }]

        //Metodo comun en nuestra Aplicacion
        comun.delete = function(task) {
            var indice = comun.tasks.indexOf(task);
            comun.tasks.splice(indice, 1);
        }
        return comun;
    })
    .controller('ctrlAlta', function($scope, $state, comun) {
        $scope.task = {}
        $scope.tasks = comun.tasks;

        $scope.priorityes = ['Low', 'Normal', 'High'];

        //Metodo para Agregar una task Nueva
        $scope.add = function() {
            $scope.tasks.push({
                name: $scope.task.name,
                priority: parseInt($scope.task.priority)
            })

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
            comun.delete(task)
        }

    })
    .controller('ctrlEditar', function($scope, $state, comun) {

    })
