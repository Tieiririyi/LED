/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('adminUserDetails', function ()
{
    return {
        restrict: 'E',
        templateUrl: 'client/admin/users-management/admin-user-details/admin-user-details.html',
        controllerAs: 'adminUserDetails',
        controller: function ($scope, $stateParams, $meteor, $reactive) {
            
            $reactive(this).attach($scope);
            this.subscribe('users');

            this.helpers({
                user : () => {
                    return Meteor.users.findOne({_id: $stateParams.userID});
                },
                roles: () => {
                    return {
                        customer: Roles.userIsInRole($stateParams.userID, 'customer', 'led'),
                        admin: Roles.userIsInRole($stateParams.userID, 'admin', 'led')
                    }
                }
            });
            
            this.editUser = () =>{

                //update roles
                var roles = [];
                if (this.roles.customer == true){
                    roles.push('customer');
                }
                if (this.roles.admin == true){
                    roles.push('admin');
                }
                Meteor.call('updateRoles', this.user._id, roles, 'led');
                
                //update profile
                Meteor.call('updateUser', this.user._id, this.user.profile, 'led');
                
            }
        }
    }
});