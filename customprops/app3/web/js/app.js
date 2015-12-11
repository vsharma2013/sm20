'use strict';

angular.module('myApp', [
    'ui.router'
    //,'ngAnimate'
    ,'ui.grid'
    ,'ui.bootstrap'   
]).
    config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "partials/home.html"   
            })
            .state('home.requisition', {
                url: "/requisition/:reqid",
                templateUrl: "partials/requisition.html",
                controller: 'requisitionController',
                controllerAs: 'vm',
                resolve: {
                    requisition: ['requisionService', '$stateParams', function (requisionService, $stateParams) {
                        var reqid = 1;
                        if($stateParams.reqid)
                            reqid = $stateParams.reqid;
                        return requisionService.getRequisition(reqid)
                    }]
                }
            })
    }]);