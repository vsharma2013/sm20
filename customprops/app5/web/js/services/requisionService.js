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
        return $http.get(ENV.apiEndPoint+'configuration/'+tenantid+'/config', {headers: {'Authorization': 'Basic dXNlcm5hbWU6dXNlcmtleQ=='}}).success(function (response) {
            console.log(response);
            return response;
        }).error(function (error) {
            return error;
        });
    }

    function getRequisition(tenantid, reqid) {            
        return  $http.get(ENV.apiEndPoint+'requisition/'+tenantid+'/'+reqid, {headers: {'Authorization': 'Basic dXNlcm5hbWU6dXNlcmtleQ=='}}).success(function(response) {
            console.log(response);
            return response;
        }).error(function(error) {
           return error;
        });
    }

    function saveRequisition(tenantid, reqid, data){
        return $http.post(ENV.apiEndPoint+'requisition/'+tenantid+'/'+reqid, angular.toJson(data), {headers: {'Authorization': 'Basic dXNlcm5hbWU6dXNlcmtleQ=='}}).success(function(response) {
           return response;
        }).error(function(error) {
           return error;
        });
    }

    function submitRequisition(tenantid, reqid, data){
        return $http.post(ENV.apiEndPoint+'requisition/'+tenantid+'/'+reqid+'/submit', angular.toJson(data), {headers: {'Authorization': 'Basic dXNlcm5hbWU6dXNlcmtleQ=='}}).success(function(response) {
           return response;
        }).error(function(error) {
           return error;
        });
    }

    function saveSettings(tenantid, data){
        return $http.post(ENV.apiEndPoint+'configuration/'+tenantid+'/config', angular.toJson(data), {headers: {'Authorization': 'Basic dXNlcm5hbWU6dXNlcmtleQ=='}}).success(function(response) {
           return response;
        }).error(function(error) {
           return error;
        });
    }
}