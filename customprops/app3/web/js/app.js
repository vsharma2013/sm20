'use strict';

angular.module('myApp', [
    'ui.router'
    ,'ngAnimate'
    ,'ui.bootstrap'   
]).
    config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "partials/main.html",
                controller: 'homeController',
                controllerAs: 'vm'
            })
            .state('home.procurement', {
                url: "/procurement",
                templateUrl: "partials/procurement.html",
                controller: 'procurementController',
                controllerAs: 'vm'
                // resolve: {
                //     requisition: ['DataService', function (DataService) {
                //         return DataService.getRequisition(0);
                //     }]
                // }
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