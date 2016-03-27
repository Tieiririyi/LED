/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led').directive('ordersManagement', function ()
{
    return {
        restrict:'E',
        templateUrl:'client/admin/orders-management/orders-management.html',
        controllerAs:'ordersMngtCtrl',
        controller: function ($scope, $meteor, $reactive, $location){
            $reactive(this).attach($scope);
            this.subscribe('orders');
            this.subscribe('users');

            this.helpers({
                orders: () => {

                    return Orders.find({orderDate: {$ne: ""}}).map(function(order){
                        return {
                            _id: order._id,
                            user: Meteor.users.findOne({_id: order.userId}).emails[0].address,
                            orderNum: order.orderNum,
                            orderDate: order.orderDate,
                            status: order.status,
                            processDate: order.processDate,
                            processAdmin: order.processBy == ""? "" : Meteor.users.findOne({_id: order.processBy}).profile.name
                        }
                    });
                }
            });
        }
    }
});