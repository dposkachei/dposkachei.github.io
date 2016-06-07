'use strict';

/* Controllers */
//var phonecatApp = angular.module('phonecatApp', ['ngRoute']);


var bookApp = angular.module('bookApp', ['ngRoute']);
var groupApp = angular.module('groupApp', ['ngRoute', 'ngResource', 'ngAnimate']);



groupApp.controller('GroupListCtrl',['$scope','$http', function($scope, $http) {
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

groupApp.controller('PersonListCtrl',['$scope','$http','$routeParams', function($scope, $http, $routeParams) {

    $scope.viewClass = 'hi';

    $http.get('persons/tabs.json').success(function(data, status, headers, config) {
        $scope.tabs = data;
    });
    $http.get('persons/pdf.json').success(function(data, status, headers, config) {
        $scope.pdf = data;
    });
    $scope.isActive = function(file) {
      return file.person_id === $routeParams.personId;
    };

    $scope.myAnimate = function() {
      if ($scope.viewClass === 'animate-enter') {
        $scope.viewClass = 'animate-enter-active';
      }
      else {
        $scope.viewClass = 'animate-enter'
      }
    };

}]);



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
