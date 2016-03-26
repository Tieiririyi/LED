/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('usersManagement', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/admin/users-management/users-management.html',
        controllerAs:'usersMgntCtrl',
        controller: function ($scope,$stateParams, $meteor, $reactive, $location){
            $reactive(this).attach($scope);
            this.subscribe('users');

            this.helpers({
                users: ()=> {
                    return Meteor.users.find().map(function(users){
                        return {_id: users._id, email: users.emails[0].address, profile: {name: users.profile.name}, roles: users.roles};
                    });
                }
            });

            this.addUser = () => {
              $location.path('/admin/users/add');
            };
        }
    }
});