'use strict';

angular.module('myApp').
    factory('DataService', ['$http', DataService]);

function DataService($http) {

    var dataService = {
        getRequisition: getRequisition
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
        return  $http.get('js/services/dummy.json').success(function(response) {
            return response;
        }).error(function(error) {
           return error;
        });
    }
}