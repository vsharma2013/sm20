'use strict';

angular.module('myApp', [
    'ngRoute'
]).
    config(['$routeProvider', '$httpProvider', '$provide', '$locationProvider', function ($routeProvider, $httpProvider, $provide, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: "partials/home.html",
            controller: 'homeController'   
        })
        .when('/requisition/:reqid/:tenantid', {
            templateUrl: "partials/requisition.html",
            controller: 'requisitionController',
            controllerAs: 'vm',
            resolve: {
                requisition: ['requisionService', '$route', function (requisionService, $route) {
                    return requisionService.getRequisition($route.current.params.reqid, $route.current.params.tenantid);
                }],
                settings: ['requisionService', '$route', function (requisionService, $route) {
                    return requisionService.getSettings($route.current.params.tenantid);
                }]
            }
        })
        .when('/configuration/:reqid/', {
            templateUrl: "partials/configuration.html",
            controller: 'configurationController',
            controllerAs: 'vm',
            resolve: {
                settings: ['requisionService', '$route', function (requisionService, $route) {
                    var reqid = 1;
                    if($route.current.params.reqid)
                        reqid = $route.current.params.reqid;
                    
                    return requisionService.getSettings(reqid);
                }]
            }
        })
        .otherwise({redirectTo: '/'})
    }]);