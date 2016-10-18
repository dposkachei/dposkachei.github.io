'use strict';

storeApp.controller('LoadItem',['$scope','$http', function($scope, $http) {
    $scope.$on('LOAD',function($scope) { $scope.loading=true });
    $scope.$on('UNLOAD',function($scope) { $scope.loading=false });
}]);


storeApp.controller('formCtrl',['$scope','$http','$location','$route','ngProgressFactory','$timeout','Notification',
    function($scope, $http, $location,$route,ngProgressFactory,$timeout,Notification) {
        /*
        |------------------------------------
        | Progress Bar for ajax loading
        |------------------------------------
        */
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.setColor('#00bcd4');

        $scope.loadForm = false;
        console.log('hi');
        $scope.basketcount = 100;

        $scope.reviewSuccess = false;
        /*
        |------------------------------------
        | AJAX add item on basket
        |------------------------------------
        */

        $scope.goToBasket = true;

        $scope.addOnBasket = function(url) {
            $scope.goToBasket = false;

            $scope.progressbar.start();

            $scope.error = '';
            $http({
                method  : 'POST',
                url     : url,
                data    : $.param($scope.item),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            }).success(function(data) {
                console.log(data);
                $scope.progressbar.complete();
                if (data[data.length - 1]) {
                    if(data[data.length - 1].label_name) {
                        Notification.success({
                            message: '<div>' + data[data.length - 1].item_title + '</div><div>' + data[data.length - 1].item_option_size + '</div><div>Номер: ' + data[data.length - 1].label_number + '</div><div>Имя: ' + data[data.length - 1].label_name + '</div>',
                            title: 'Товар добавлен в корзину'
                        });
                    }
                    else {
                        Notification.success({
                            message: '<div>' + data[data.length - 1].item_title + '</div>',
                            title: 'Товар добавлен в корзину'
                        });
                    }
                    $scope.countBasket();
                }
                $scope.goToBasket = true;
            }).error(function(data, status, headers, config){
                if (data.error) {
                    $scope.error = data.error;
                }
                console.log(data);
                console.log(status);

                $scope.progressbar.reset();

                $scope.goToBasket = true;
            });
        };
        /*
         |-----------------------------------------------
         | AJAX reload count items in basket
         |-----------------------------------------------
        */
        $scope.count = Number(angular.element(document.getElementById('cart__count')).text());
        $scope.countBasket = function() {
            $timeout(function() {
                if ($scope.count !== angular.element(document.getElementById('cart__count')).text()) {
                    $scope.count = Number(angular.element(document.getElementById('cart__count')).text());
                }
                //console.log($scope.count++);
                angular.element(document.getElementById('cart__count')).html(++$scope.count);
            }, 100);

        };
        /*
         |-----------------------------------------------
         | AJAX change select-regions for select-cities
         |-----------------------------------------------
        */
        $scope.regionSuccess = false;
        $scope.changeRegion = function(url) {
            $scope.progressbar.start();

            //$scope.order.city_id = {};
            $http({
                method  : 'POST',
                url     : url,
                data    : $.param($scope.order),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            }).success(function(data) {
                console.log(data.cities);
                $scope.cities = data.cities;
                $scope.regionSuccess = true;

                $timeout(function() {
                    console.log(data.cities);
                }, 100);
                $scope.progressbar.complete();
            }).error(function(data, status, headers, config){
                console.log(data);
                console.log(status);

                $scope.progressbar.reset();
            });
        };
        /*
         |-----------------------------------------------
         | AJAX add order
         |-----------------------------------------------
        */
        $scope.order_id = 0;
        $scope.addOnOrder = function(url) {
            $scope.progressbar.start();

            $scope.error = '';

            $http({
                method  : 'POST',
                url     : url,
                data    : $.param($scope.order),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            }).success(function(data) {
                console.log(data);
                if (data.order['message']) {
                    Notification.success({
                        message: data.order['message'],
                        title: 'Успешно'
                    });
                    $scope.orderSuccess = true;
                    $scope.order_id = data.order['order_id'];
                }

                $scope.progressbar.complete();
            }).error(function(data, status, headers, config){
                if (status == 400) {
                    $scope.error = data.error;
                }
                if (status == 404) {
                    Notification.error({
                        message: 'Добавьте товары в корзину.',
                        title: 'Ошибка, ваша корзина пуста'
                    });
                    //Notification.error({message: 'Ошибка, ваша корзина пуста.', positionY: 'bottom', positionX: 'right'});
                }
                console.log(data);
                console.log(status);

                $scope.progressbar.reset();
            });
        };

    }
]);

