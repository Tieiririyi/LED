/**
 * Created by Tieiririyi on 2016-01-24.
 */
angular.module('led').directive('led', function () {
    return {
            restrict: 'E',
            templateUrl:'client/led/led.html',

        controllerAs: 'led',
        controller: function ($scope, $reactive, $location) {
        $reactive(this).attach($scope);

            this.login = () =>{
                Meteor.loginWithPassword;
            };

            this.logout = () => {
                Meteor.logout();
                $location.path('/categories');
            };

            this.helpers({
                current_user: ()=> {
                    return Meteor.userId();
                }
            });

    }
}
});