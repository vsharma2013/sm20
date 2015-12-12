'use strict';

angular.module('myApp').
    factory('requisionService', ['$http' ,'ENV' , requisionService]);

function requisionService($http, ENV) {

    var dataService = {
        getRequisition: getRequisition,
        saveRequisition: saveRequisition
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
        return $http.post(ENV.apiEndPoint+'req/save', JSON.stringify(req)).success(function(response) {
           return response;
        }).error(function(error) {
           return error;
        });
    }
}