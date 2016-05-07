/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('adminAddUser', function ()
{
    return {
        restrict: 'E',
        templateUrl: 'client/admin/users-management/admin-add-user/admin-add-user.html',
        controllerAs: 'adminAddUser',
        controller: function ($scope, $stateParams, $meteor, $reactive, $state) {
            $reactive(this).attach($scope);
            this.subscribe('users');

            this.register = (user) =>
            {
                Meteor.call('adminCreateUser',user, (error) => {
                    if (error) {
                        console.log(error.reason);
                        this.message = "User could not be added:" + error.reason;
                    }
                    else{
                        Meteor.call('findUserByEmail', user, (error, result) => {
                            userId = result._id;
                            Meteor.call('updateRoles', userId, user.role, 'led');
                            Meteor.call('updateUser', userId, {name: user.name, status: "active"}, 'led', (error) => {
                                $state.go('users-management');
                            });
                         });
                    }
                    $scope.$apply();
                });
            }
        }
    }
});