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

                })

        $stateProvider
            .state('products',
                {
                    url: '/categories/:id',
                    template: '<products-list></products-list>'
                })

        $stateProvider
            .state('product',
                {
                    url: '/categories/:catId/:prodId',
                    template: '<product></product>'
                })

        $stateProvider
            .state('inventory_management',
                {
                    url: '/inventory',
                    template: '<inventory-management></inventory-management>',
                    resolve: {
                        currentUser: ($q) => {
                            if (Meteor.userId() == null) {
                                return $q.reject('AUTH_REQUIRED');
                            }
                            else {
                                return $q.resolve();
                            }
                        }
                    }
                })

        $stateProvider
            .state('addProduct',
                {
                    url: '/inventory/addProduct',
                    template: '<add-product></add-product>'
                })

        $stateProvider
            .state('inventoryProductDetails',
                {
                    url: '/inventory/edit/:prodId',
                    template: '<inventory-product-details></inventory-product-details>'
                })

        $stateProvider
            .state('createAccount',
                {
                    url: '/users/createAccount',
                    template: '<create-account></create-account>'
                })
        $stateProvider
            .state('users',
                {
                    url: '/users',
                    template: '<users></users>'
                })
        $stateProvider
            .state('userProfiles', {
                url: '/users/profiles',
                template: '<user-profiles></user-profiles>'
            })

        $stateProvider
            .state('shoppingCart', {
                url: '/shoppingCart',
                template: '<shopping-cart></shopping-cart>'
            })
        //$urlRouterProvider.otherwise("/categories");
    });

