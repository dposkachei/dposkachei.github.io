'use strict';

/* App Module */

// Here we define the maim module for easy dependency injection into other modules
/*
    NPROGRESS
*/
angular.module('ngProgress', ['ngProgress.directive', 'ngProgress.provider']);

var storeApp = angular.module('storeApp', ['ngRoute','ngProgress','ui-notification']);
