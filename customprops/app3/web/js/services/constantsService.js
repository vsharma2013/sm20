'use strict';

angular.module('myApp').
    factory('contantsService', ['$http' ,'ENV' , contantsService]);

function contantsService($http, ENV) {

    var customp;

    var dataService = {
        loadCustomProps: loadCustomProps,
        getCustomProps: getCustomProps
    };    

    return dataService;

    function getCustomProps(callback) {
        return customp;
    }

    function loadCustomProps(){
        return  $http.get(ENV.apiEndPoint+'cpuischema').success(function(response) {
            console.log('customp', response);
            customp = response;
            return response;
        }).error(function(error) {
           return error;
        });
    }
}