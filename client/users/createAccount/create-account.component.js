/**
 * Created by Tieiririyi on 2016-02-28.
 */
angular.module('led').directive('createAccount', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/createAccount/create-account.html',
        controllerAs:'newUsersCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $location, store){
            $reactive(this).attach($scope);
            //this.subscribe('users');



            this.register = (user) =>{
                //method works, but need to use Account method to verify email still
                //Meteor.call('sendEmail', user.email, "hi");

                Accounts.createUser({
                    email: user.email,
                    password: user.password,
                    profile: {
                        name: user.name,
                        status: "active"
                    }
                }, function(error){
                    if (error){
                        console.log(error.reason);
                    }
                    else{
                        //Accounts.sendVerificationEmail(Meteor.userId());
                        Meteor.call('updateRoles', Meteor.userId(), ['customer'], 'led', (error) => {
                            if (!error){

                                Orders.insert({
                                    userId: Meteor.userId(),
                                    order: store.get('cart'),
                                    status: "not ordered",
                                    orderDate: "",
                                    processDate: "",
                                    processBy: ""
                                });

                                var redirect = $location.search().redirect;
                                if (redirect != undefined){
                                    $location.search('redirect');
                                    $location.path(redirect);
                                }
                                else{
                                    $location.path('/categories');
                                }
                            }
                            console.log(Meteor.user());

                        });
                    }
                });
            }
        }
    };
});