/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led')
    .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('categories',
                {
                    url: '/categories',
                    template: '<categories-list></categories-list>'

                });
        $stateProvider
            .state('ledGuide',
            {
                url: '/led_guide',
                template: '<led-guide></led-guide>'
            });

        $stateProvider
            .state('products',
                {
                    url: '/categories/:id',
                    template: '<products-list></products-list>'
                });

        $stateProvider
            .state('product',
                {
                    url: '/categories/:catId/:prodId',
                    template: '<product></product>'
                });

        $stateProvider
            .state('addProduct',
                {
                    url: '/admin/inventory/addProduct',
                    template: '<add-product></add-product>'
                });

        $stateProvider
            .state('inventoryProductDetails',
                {
                    url: '/admin/inventory/edit/:prodId',
                    template: '<inventory-product-details></inventory-product-details>'
                });

        $stateProvider
            .state('createAccount',
                {
                    url: '/users/createAccount',
                    template: '<create-account></create-account>'
                });
        $stateProvider
            .state('users',
                {
                    url: '/users',
                    template: '<users></users>'
                });
        $stateProvider
            .state('userProfiles', {
                url: '/users/profiles',
                template: '<user-profiles></user-profiles>'
            });
        $stateProvider
            .state('orderHistory', {
                url: "/users/order_history",
                template: '<order-history></order-history>'
            });

        $stateProvider
            .state('shoppingCart', {
                url: '/shoppingCart',
                template: '<shopping-cart></shopping-cart>'
            });
        $stateProvider
            .state('confirmation', {
                url: '/shoppingCart/:confirmation',
                template: '<order-confirm></order-confirm>'
            });
        $stateProvider
            .state('ordersMngt', {
                url: '/admin/orders',
                template: '<orders-management></orders-management>',
                resolve: {
                    currentUser: ($q) => {
                    if (Meteor.user().profile.role != "superuser" && Meteor.user().profile.role != "admin"){
                            return $q.reject('AUTH_REQUIRED');
                        }
                        else{
                            return $q.resolve();
                        }
                    }
                }
            });

        $stateProvider
            .state('adminOrders', {
                url: '/admin/orders/:orderId',
                template: '<orders></orders>',
                resolve: {
                    currentUser: ($q) => {
                    if (Meteor.user().profile.role != "superuser" && Meteor.user().profile.role != "admin"){
                        return $q.reject('AUTH_REQUIRED');
                    }
                    else{
                        return $q.resolve();
                    }
                }
            }
        });

        
        $stateProvider
            .state('inventory-management',
                {
                    url: '/admin/inventory',
                    template: '<inventory-management></inventory-management>',
                    resolve: {
                        currentUser: ($q) => {
                        if (Meteor.user().profile.role != "superuser" && Meteor.user().profile.role != "admin"){
                                return $q.reject('AUTH_REQUIRED');
                            }
                            else{
                                return $q.resolve();
                            }
                        }
                    }
                });

        /*user management*/
        $stateProvider
            .state('users-management',
                {
                    url: '/admin/users',
                    template: '<users-management></users-management>',
                    resolve: {
                        currentUser: ($q) => {
                            if (Meteor.user().profile.role != "superuser" && Meteor.user().profile.role != "admin"){
                                return $q.reject('AUTH_REQUIRED');
                            }
                            else{
                                return $q.resolve();
                            }
                        }
                    }
                });
                
        $stateProvider
            .state('admin-add-users',
                {
                    url: '/admin/users/add',
                    template: '<admin-add-user></admin-add-user>',
                    resolve: {
                        currentUser: ($q) => {
                            if (Meteor.user().profile.role != "superuser" && Meteor.user().profile.role != "admin"){
                                return $q.reject('AUTH_REQUIRED');
                            }
                            else{
                                return $q.resolve();
                            }
                        }
                    }
                });


        $stateProvider
            .state('admin-user-details', {
                url: '/admin/users/:userID',
                template: '<admin-user-details></admin-user-details>',
                resolve: {
                    currentUser: ($q) => {
                    if (Meteor.user().profile.role != "superuser" && Meteor.user().profile.role != "admin"){
                        return $q.reject('AUTH_REQUIRED');
                    }
                    else{
                        return $q.resolve();
                    }
                }
            }
        });

        //$urlRouterProvider.otherwise("/categories");
    });

