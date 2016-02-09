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

        //$urlRouterProvider.otherwise("/categories");
    });
