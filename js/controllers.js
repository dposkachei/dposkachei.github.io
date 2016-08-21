'use strict';

/* Controllers */
//var phonecatApp = angular.module('phonecatApp', ['ngRoute']);


var bookApp = angular.module('bookApp', ['ngRoute']);
var groupApp = angular.module('groupApp', ['ngRoute', 'ngResource', 'ngAnimate', 'ngProgress']);



groupApp.controller('GroupListCtrl',['$scope','$http','ngProgressFactory',
  function($scope, $http,ngProgressFactory) {
    $scope.$on('LOAD',function($scope) { $scope.loading=true });
    $scope.$on('UNLOAD',function($scope) { $scope.loading=false });

    $http.get('persons/persons.json').success(function(data, status, headers, config) {
        $scope.persons = data;
    });
    $scope.openMenu = function() {
      $scope.menu = 'open-menu';
    }
    $scope.hideMenu = function() {
      $scope.menu = '';
    }

}]);

groupApp.controller('PersonListCtrl',['$scope','$http','$routeParams','ngProgressFactory', 
  function($scope, $http, $routeParams,ngProgressFactory) {
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.progressbar.setColor('#000');
    $scope.progressbar.start(); 
    
    
    

    $scope.$on('LOAD',function($scope) { 
      $scope.progressbar.start(); 
      console.log('LOAD'); 
    });
    $scope.$on('UNLOAD',function($scope) { 
      $scope.progressbar.complete(); 
      console.log('UNLOAD'); 
    });

    $http.get('persons/tabs.json').success(function(data, status, headers, config) {
        $scope.tabs = data;
    });
    $http.get('persons/pdf.json').success(function(data, status, headers, config) {
        $scope.pdf = data;
    });
    $http.get('persons/persons.json').success(function(data, status, headers, config) {
        $scope.persons = data;
    });
    $scope.isActive = function(file) {
      
      return file.person_id === $routeParams.personId;
    };
    $scope.onePerson = function(person) {
      return person.id === $routeParams.personId;
    };

    $scope.myAnimate = function() {
      if ($scope.viewClass === 'animate-enter') {
        $scope.viewClass = 'animate-enter-active';

      }
      else {
        $scope.viewClass = 'animate-enter';

      }
    };
    $scope.progressbar.complete(); 

}]);

/*



.controller('firstCtrl', function($scope, dataHolder){
  $scope.value = dataHolder.getValue();
})

.controller('secondCtrl', function($scope, dataHolder){
  $scope.pass = function() {
    dataHolder.updateValue($scope.value);
    $scope.value = '';
  }
})
*/






groupApp.config(['$routeProvider', function($routeProvide) {
  $routeProvide
      .when('/',{
        templateUrl:'template/home.html',
        controller: 'GroupListCtrl'
      })
      .when('/person/:personId',{
        templateUrl:'template/person.html',
        controller: 'PersonListCtrl'
      })
      .otherwise({
        redirectTo:'/'
      })
}]);
