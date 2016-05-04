/**
 * Created by Tieiririyi on 2016-02-07.
 */
angular.module('led')
    .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home',
                {
                    url:'/home',
                    template:'<home></home>'
                }

            );
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
            .state('userOrders', {
                url: "/users/order_history/:orderId",
                template: "<user-orders></user-orders>"
            });

        $stateProvider
            .state('shoppingCart', {
                url: '/shoppingCart',
                template: '<shopping-cart></shopping-cart>'
            });
            
        $stateProvider
            .state('orderReview', {
                url: '/orders/review',
                template: '<order-review></order-review>'
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
                        if (Meteor.userId() != null && Roles.userIsInRole(Meteor.userId(), ['admin', 'super-admin'], 'led')){
                            return $q.resolve();
                        }
                        else{
                            return $q.reject('AUTH_REQUIRED');
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
                        if (Meteor.userId() != null && Roles.userIsInRole(Meteor.userId(), ['admin', 'super-admin'], 'led')){
                            return $q.resolve();
                        }
                        else{
                            return $q.reject('AUTH_REQUIRED');
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
                        if (Meteor.userId() != null && Roles.userIsInRole(Meteor.userId(), ['admin', 'super-admin'], 'led')){
                                return $q.resolve();
                            }
                            else{
                                return $q.reject('AUTH_REQUIRED');
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
                        if (Meteor.userId() != null && Roles.userIsInRole(Meteor.userId(), ['admin', 'super-admin'], 'led')){
                                return $q.resolve();
                            }
                            else{
                                return $q.reject('AUTH_REQUIRED');
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
                        if (Meteor.userId() != null && Roles.userIsInRole(Meteor.userId(), ['admin', 'super-admin'], 'led')){
                                return $q.resolve();
                            }
                            else{
                                return $q.reject('AUTH_REQUIRED');
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
                        if (Meteor.userId() != null && Roles.userIsInRole(Meteor.userId(), ['admin', 'super-admin'], 'led')){
                            return $q.resolve();
                        }
                        else{
                            return $q.reject('AUTH_REQUIRED');
                        }
                    }
                }
            });
        $stateProvider
            .state('forgot-password', {
               url: '/users/forgot-password/',
               template: '<forgot-password></forgot-password>'
            });
            
        $stateProvider
            .state('verify-user', {
                url: '/users/verify-email/',
                template: '<verify-email></verify-email>'
            });
            
        $stateProvider
            .state('reset-password', {
                url: '/users/reset-password/:token',
                template: '<reset-password></reset-password>'
            });
        $urlRouterProvider.otherwise("/home");
    });

