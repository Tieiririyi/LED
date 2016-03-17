/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('adminUserDetails', function ()
{
    return {
        restrict: 'E',
        templateUrl: 'client/admin/users-management/user-details/user-details.html',
        controllerAs: 'adminUserDetails',
        controller: function ($scope, $stateParams, $meteor, $reactive) {
            $reactive(this).attach($scope);
            
            this.helpers({
                user : () => {
                    console.log(Meteor.users.findOne({_id: $stateParams.userID}));
                    return Meteor.users.findOne({_id: $stateParams.userID});
                }
            });

            this.editUser = (user) =>
            {
                Meteor.users.update({_id: this.user._id}, {
                    $set: {
                        profile: {
                            "name": user.name,
                            "role": user.role == "admin"? "admin": "customer"
                        }
                    }
                });
            }
        }
    }
});