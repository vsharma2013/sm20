'use strict';

angular.module('myApp', [
    'ui.router'
    //,'ngAnimate'
    ,'ui.bootstrap'   
]).
    config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "partials/home.html"   
            })
            .state('home.procurement', {
                url: "/procurement",
                templateUrl: "partials/procurement.html",
                controller: 'procurementController',
                controllerAs: 'vm',
                resolve: {
                    requisition: ['requisionService', function (requisionService) {
                        return requisionService.getRequisition(1)
                    }]
                }
            })
            // .state('home.mongo', {
            //     url: "/mongo",
            //     templateUrl: "partials/reactgrid.html",
            //     controller: 'dbController',
            //     controllerAs: 'vm',
            //     resolve: {
            //         tableData: ['DataService', function (DataService) {
            //             return DataService.getAllRequisitions();
            //         }]
            //     }
            // })
            // .state('home.sql', {
            //      url: "/sql",
            //     templateUrl: "partials/reactgrid.html",
            //     controller: 'dbController',
            //     controllerAs: 'vm',
            //     resolve: {
            //         tableData: ['DataService', function (DataService) {
            //             return DataService.getAllRequisitions();
            //         }]
            //     }
            // })
            // .state('home.elastic', {
            //      url: "/elastic",
            //     templateUrl: "partials/reactgrid.html",
            //     controller: 'dbController',
            //     controllerAs: 'vm',
            //     resolve: {
            //         tableData: ['DataService', function (DataService) {
            //             return DataService.getAllRequisitions();
            //         }]
            //     }
            // })

    }]);