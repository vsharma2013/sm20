'use strict';

angular.module('myApp').
    factory('requisionService', ['$http' ,'ENV' , requisionService]);

function requisionService($http, ENV) {

    var dataService = {
        getRequisition: getRequisition,
        getSettings: getSettings,
        saveRequisition: saveRequisition,
        submitRequisition: submitRequisition,
        saveSettings: saveSettings
    };    

    return dataService;

    function getSettings(tenantid) {
        return $http.get(ENV.apiEndPoint + 'configuration/'+tenantid+'/config').success(function (response) {
            console.log(response);
            return response;
        }).error(function (error) {
            return error;
        });
    }

    function getRequisition(reqid, tenantid) {
        var params={
            params:{
                r:reqid,
                t:tenantid
            } 
        };       
        return  $http.get(ENV.apiEndPoint+'requisition/'+tenantid+'/'+reqid, params).success(function(response) {
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

    function saveSettings(settings){
        return $http.post(ENV.apiEndPoint+'settings/save', angular.toJson(settings)).success(function(response) {
           return response;
        }).error(function(error) {
           return error;
        });
    }
}