/**
 * Created by Tieiririyi on 2016-01-24.
 */
angular.module('led').directive('ledGuide', function () {
    return {
        restrict: 'E',
        templateUrl:'client/led-guide/led-guide.html',

        controllerAs: 'ledGuide',
        controller: function ($scope, $reactive, $location) {
            $reactive(this).attach($scope);
            
            
        }
    };
});