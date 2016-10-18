'use strict';

/* Directives */
// Here we have the directive that we append to the body. It handles all the things related to the
// styling and DOM
angular.module('ngProgress.directive', [])
    .directive('ngProgress', ["$window", "$rootScope", function ($window, $rootScope) {
        var directiveObj = {
            // Replace the directive
            replace: true,
            // Only use as a element
            restrict: 'E',
            link: function ($scope, $element, $attrs, $controller) {
                // Watch the count on the $rootScope. As soon as count changes to something that
                // isn't undefined or null, change the counter on $scope and also the width of
                // the progressbar. The same goes for color and height on the $rootScope
                $scope.$watch('count', function (newVal) {
                    if (newVal !== undefined || newVal !== null) {
                        $scope.counter = newVal;
                        $element.eq(0).children().css('width', newVal + '%');
                    }
                });
                $scope.$watch('color', function (newVal) {
                    if (newVal !== undefined || newVal !== null) {
                        $scope.color = newVal;
                        $element.eq(0).children().css('background-color', newVal);
                        $element.eq(0).children().css('color', newVal);
                    }
                });
                $scope.$watch('height', function (newVal) {
                    if (newVal !== undefined || newVal !== null) {
                        $scope.height = newVal;
                        $element.eq(0).children().css('height', newVal);
                    }
                });
            },
            // The actual html that will be used
            template: '<div id="ngProgress-container"><div id="ngProgress"></div></div>'
        };
        return directiveObj;
    }]);


storeApp.directive('valueInput', function ($parse) {
    return {
      link: function (scope, element, attrs) {
        if (attrs.ngModel && attrs.value) {
          $parse(attrs.ngModel).assign(scope, attrs.value);
        }
      }
    };
});


storeApp.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }
    };
});
storeApp.directive('valueInput', function ($parse) {
    return {
      link: function (scope, element, attrs) {
        if (attrs.ngModel && attrs.value) {
          $parse(attrs.ngModel).assign(scope, attrs.value);
        }
      }
    };
});
storeApp.directive('valueSelect', function ($parse) {
    return {
      link: function (scope, element, attrs) {
        if (attrs.ngModel) {
          $parse(attrs.ngModel).assign(scope);
        }
      }
    };
});



