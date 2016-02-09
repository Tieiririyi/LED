/**
 * Created by Tieiririyi on 2016-01-24.
 */
angular.module('led').directive('led', function () {
    return {
            restrict: 'E',
            templateUrl:'client/led/led.html',

        controllerAs: 'led',
        controller: function ($scope, $reactive) {
        $reactive(this).attach($scope);


    }
}
});