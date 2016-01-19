'use strict';

angular.module('myApp', [
    'ngRoute'
    //,'ngAnimate'
    ,'ui.grid'
    ,'ui.bootstrap'   
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
                    var reqid = 1;
                    var tenantid = 1;
                    if($route.current.params.reqid)
                        reqid = $route.current.params.reqid;
                    if($route.current.params.tenantid)
                        tenantid = $route.current.params.tenantid;

                    return requisionService.getRequisition(tenantid, reqid);
                }],
                settings: ['requisionService', '$route', function (requisionService, $route) {
                    var tenantid = 1;
                    if($route.current.params.tenantid)
                        tenantid = $route.current.params.tenantid;

                    return requisionService.getSettings(tenantid);
                }]
            }
        })
        .when('/configuration/:tenantid/', {
            templateUrl: "partials/configuration.html",
            controller: 'configurationController',
            controllerAs: 'vm',
            resolve: {
                settings: ['requisionService', '$route', function (requisionService, $route) {
                    var tenantid = 1;
                    if($route.current.params.tenantid)
                        tenantid = $route.current.params.tenantid;
                    
                    return requisionService.getSettings(tenantid);
                }]
            }
        })
        .otherwise({redirectTo: '/'})
    }]);