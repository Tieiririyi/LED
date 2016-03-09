/**
 * Created by Tieiririyi on 2016-01-12.
 */
angular.module('led',[
    'angular-meteor',
    'ui.router', 
    'ngMaterial',
    'ngFileUpload',
    'accounts.ui']);

function onReady(){

    angular.bootstrap(document,['led'],{
        strictDI: true
    });
}

angular.element(document).ready(onReady);







