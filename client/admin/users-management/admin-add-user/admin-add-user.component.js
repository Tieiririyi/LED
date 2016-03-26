/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('adminAddUser', function ()
{
    return {
        restrict: 'E',
        templateUrl: 'client/admin/users-management/admin-add-user/admin-add-user.html',
        controllerAs: 'adminAddUser',
        controller: function ($scope, $stateParams, $meteor, $reactive) {
            $reactive(this).attach($scope);

            this.register = (user) =>
            {
                Accounts.createUser({
                    email: user.email,
                    password: user.password,
                    profile: {
                        name: user.name,
                        role: user.role
                    }
                }, function (error) {
                    if (error) {
                        console.log(error.reason);
                    }
                });
            }
        }
    }
});