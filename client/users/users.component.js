/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('users', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/users.html',
        controllerAs:'usersCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $location){
            $reactive(this).attach($scope);

            this.helpers({
                    current_user: ()=> {
                    //return Meteor.user();
                    return Meteor.users.find({_id: Meteor.user()._id});
                }
            })

            this.register = (user) =>{
                console.log(user);
                Accounts.createUser({
                    email: user.email,
                    password: user.password,
                    profile: {
                        name: user.name
                    }
                }, function(error){
                    if (error){
                        console.log(error.reason);
                    }
                    else{

                        console.log(Meteor.users.find().fetch());
                    }
                });
                //console.log(Meteor.users.find().fetch());
                //$location.path();
            }

            this.login = (user) => {
                Meteor.loginWithPassword(user.email, user.password, function(error){
                    if (error){
                        console.log(error.reason);
                    }
                    else {
                        console.log(Meteor.user());
                    }
                });
            }

            this.logout = () => {
                console.log(Meteor.user()._id);
                Meteor.logout();
                console.log(Meteor.user());
            }
        }
    };
});