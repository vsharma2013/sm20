'use strict';

angular.module('myApp').
	controller('modalController', ['$scope', '$uibModalInstance', modalController]);

function modalController($scope, $uibModalInstance) {
    var vm = this;
    $scope.propname = '';
	$scope.ok = function () {
		if($scope.propname)
			$uibModalInstance.close($scope.propname);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
}