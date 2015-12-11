'use strict';

angular.module('myApp').
    factory('requisionService', ['$http' ,'ENV' , requisionService]);

function requisionService($http, ENV) {

    var dataService = {
        getRequisition: getRequisition
    };    

    return dataService;

    function getRequisition(reqid) {
        var params={
            params:{
                r:reqid
            } 
        };
        // return $http.post(ENV.apiEndPoint, JSON.stringify(postData)).success(function(response) {
        //    return response;
        // }).error(function(error) {
        //    return error;
        // });

        return  $http.get(ENV.apiEndPoint+'req', params).success(function(response) {
            return response;
        }).error(function(error) {
           return error;
        });
    }
}