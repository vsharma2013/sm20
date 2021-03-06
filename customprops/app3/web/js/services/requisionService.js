'use strict';

angular.module('myApp').
    factory('requisionService', ['$http' ,'ENV' , requisionService]);

function requisionService($http, ENV) {

    var dataService = {
        getRequisition: getRequisition,
        saveRequisition: saveRequisition,
        submitRequisition: submitRequisition
    };    

    return dataService;

    function getRequisition(reqid) {
        var params={
            params:{
                r:reqid
            } 
        };       
        return  $http.get(ENV.apiEndPoint+'req', params).success(function(response) {
            console.log(response);
            return response;
        }).error(function(error) {
           return error;
        });

        // return  $http.get('js/services/dummy.json').success(function(response) {
        //     return response;
        // }).error(function(error) {
        //    return error;
        // });
    }

    function saveRequisition(req){
        console.log(req);
        return $http.post(ENV.apiEndPoint+'req/save', angular.toJson(req)).success(function(response) {
           return response;
        }).error(function(error) {
           return error;
        });
    }

    function submitRequisition(req){
        console.log(req);
        return $http.post(ENV.apiEndPoint+'req/submit', angular.toJson(req)).success(function(response) {
           return response;
        }).error(function(error) {
           return error;
        });
    }
}