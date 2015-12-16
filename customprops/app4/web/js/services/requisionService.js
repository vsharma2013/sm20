'use strict';

angular.module('myApp').
    factory('requisionService', ['$http' ,'ENV' , requisionService]);

function requisionService($http, ENV) {

    var dataService = {
        getRequisition: getRequisition,
        getSettings: getSettings,
        saveRequisition: saveRequisition,
        submitRequisition: submitRequisition
    };    

    return dataService;

    function getSettings() {
        return $http.get(ENV.apiEndPoint + 'settings').success(function (response) {
            console.log(response);
            return response;
        }).error(function (error) {
            return error;
        });
    }

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
    }

    function saveRequisition(req){
        return $http.post(ENV.apiEndPoint+'req/save', angular.toJson(req)).success(function(response) {
           return response;
        }).error(function(error) {
           return error;
        });
    }

    function submitRequisition(req){
        return $http.post(ENV.apiEndPoint+'req/submit', angular.toJson(req)).success(function(response) {
           return response;
        }).error(function(error) {
           return error;
        });
    }
}