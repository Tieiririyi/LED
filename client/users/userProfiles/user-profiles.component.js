/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('userProfiles', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/userProfiles/user-profiles.html',
        controllerAs:'userProfilesCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $location){
            $reactive(this).attach($scope);

            this.helpers({
                    current_user: ()=> {
                        return Meteor.user();
                    }
             });

            this.update = () =>{
                console.log(this.current_user);
                //Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: this.current_user}});
            }
        }
    };
});