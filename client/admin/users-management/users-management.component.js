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
            //this.subscribe('users');
            this.helpers({
                    users: ()=> {
                        console.log(Meteor.users.find());
                        return Meteor.users.find({});
                    }
            });

            this.addUser = () => {
              $location.path('/admin/users/add');
            };
            this.deactivate = (num) => {

            };
            this.activate = (num) => {

            }
        }
    }
});