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
                    template: '<inventory-management></inventory-management>'
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


        //$urlRouterProvider.otherwise("/categories");
    });
