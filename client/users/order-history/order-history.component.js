angular.module('led').directive('orderHistory', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/users/order-history/order-history.html',
        controllerAs:'orderHistoryCtrl',
        controller: function ($scope, $stateParams, $meteor, $reactive, $location){
            $reactive(this).attach($scope);
            this.subscribe('orders');

            this.helpers({
                    current_user: ()=> {
                        return Meteor.user();
                    },
                orders : () => {
                    return Orders.find({userId: Meteor.userId(), orderDate: {$ne: ""}});

                }
            });

        }
    };
});