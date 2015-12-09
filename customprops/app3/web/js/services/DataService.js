'use strict';

angular.module('myApp').
    factory('DataService', ['$http',  '$q', DataService]);

function DataService($http,  $q) {

    var dataService = {
        getRequisition: getRequisition,
        saveRequisition: saveRequisition
    };    

    return dataService;

    function getRequisition(reqid) {
        // var postData = {
        //     method: "getRequisitionData",
        //     id: reqid
        // };
        // return $http.post(ENV.apiEndPoint, JSON.stringify(postData)).success(function(response) {
        //    return response;
        // }).error(function(error) {
        //    return error;
        // });
         return $q.when({});
    }
}