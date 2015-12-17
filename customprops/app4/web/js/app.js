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
        .when('/requisition/:reqid/', {
            templateUrl: "partials/requisition.html",
            controller: 'requisitionController',
            controllerAs: 'vm',
            resolve: {
                requisition: ['requisionService', '$route', function (requisionService, $route) {
                    var reqid = 1;
                    if($route.current.params.reqid)
                        reqid = $route.current.params.reqid;

                    return requisionService.getRequisition(reqid);
                }],
                settings: ['requisionService', '$route', function (requisionService, $route) {
                    var reqid = 1;
                    if($route.current.params.reqid)
                        reqid = $route.current.params.reqid;

                    return requisionService.getSettings(reqid);
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