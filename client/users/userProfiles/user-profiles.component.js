/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('userProfiles', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/userProfiles/user-profiles.html',
        controllerAs:'userProfilesCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive){
            $reactive(this).attach($scope);

            this.changePwd = false;

            this.helpers({
                    current_user: ()=> {
                        return Meteor.user();
                    }
            });
            
            this.changePassword = () => {
                this.changePwd = !this.changePwd;
            };

            this.update = (user) =>{
                console.log(this.current_user);

                if (Meteor.user().emails[0].address != this.current_user.emails[0].address){

                    Meteor.call('updateUserEmail', this.current_user.emails[0].address);
                    Meteor.call('verifyUserEmail');
                }
              
                if (user != undefined && this.changePwd == true){
                    if (user.oldPassword != undefined && user.password1 != undefined && user.password2 != undefined){
                        if (user.password1 == user.password2){
                            Accounts.changePassword(user.oldPassword, user.password1, function(error){
                                if (error){
                                    console.log(error);
                                }
                                //notify user password has been updated
                            });
                        }
                    }
                }

                Meteor.call('updateUser',Meteor.userId(), this.current_user.profile, (error) =>{
                    if (!error){
                        console.log(Meteor.user());
                    }
                });
            };
        }
    };
});

//Meteor.subscribe("userData");