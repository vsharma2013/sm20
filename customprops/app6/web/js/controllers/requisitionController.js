	'use strict';

angular.module('myApp').
	controller('requisitionController', ['$filter', 'settings', 'requisition', 'requisionService', requisitionController]);

function requisitionController($filter, settings, requisition, requisionService) {
    var vm = this;
    vm.groupExists = function (grp) {
        var res = false;
        angular.forEach(vm.uiGroups, function (val) {
            if (val === grp)
                res = true;
        });

        return res;
    };

    vm.requisition = requisition.data;
    vm.settings = settings.data;

    /* Widgetized data */
    vm.setupWidgets = [];
    vm.uiGroups = [];
    if (vm.settings && vm.settings.setup && vm.settings.setup.primary) {
        for (var property in vm.settings.setup.primary) {
            vm.settings.setup.primary[property].ui.inWidget = false;
            if (vm.settings.setup.primary[property].ui.isMandatory === false) {
                if (!vm.groupExists(vm.settings.setup.primary[property].ui.uiGroup)) {
                    vm.uiGroups.push(vm.settings.setup.primary[property].ui.uiGroup);
                    vm.setupWidgets.push(property);
                }

                vm.settings.setup.primary[property].ui.inWidget = true;
            }
        }
    }

    vm.uiGroups = [];
    vm.setupCustomWidgets = [];
    if (vm.settings && vm.settings.setup && vm.settings.setup.custom) {
        for (var property in vm.settings.setup.custom) {
            vm.settings.setup.custom[property].ui.inWidget = false;
            if (vm.settings.setup.custom[property].ui.isMandatory === false) {
                if (!vm.groupExists(vm.settings.setup.custom[property].ui.uiGroup)) {
                    vm.uiGroups.push(vm.settings.setup.custom[property].ui.uiGroup);
                    vm.setupCustomWidgets.push(property);
                }

                vm.settings.setup.custom[property].ui.inWidget = true;
            }
        }
    }
    /* Widgetized data */

    /* Section 1 data */
    vm.populateSetupSec1Data = function () {
        vm.setupSec1Props = [];
        if (vm.settings && vm.settings.setup && vm.settings.setup.primary) {
            for (var property in vm.settings.setup.primary) {
                if (!vm.settings.setup.primary[property].ui.inWidget && vm.settings.setup.primary[property].ui.section === 1) {
                    vm.setupSec1Props.push({ "prop": property, "isPrimary": true, "sort": vm.settings.setup.primary[property].ui.sort });
                }
            }
        }

        if (vm.settings && vm.settings.setup && vm.settings.setup.custom) {
            for (var property in vm.settings.setup.custom) {
                if (!vm.settings.setup.custom[property].ui.inWidget && vm.settings.setup.custom[property].ui.section === 1) {
                    vm.setupSec1Props.push({ "prop": property, "isPrimary": false, "sort": vm.settings.setup.custom[property].ui.sort });
                }
            }
        }

        vm.setupSec1Props = $filter('orderBy')(vm.setupSec1Props, 'sort', false);
        vm.numSec1Rows = new Array(parseInt(vm.setupSec1Props.length / 3, 10) + (vm.setupSec1Props.length % 3 > 0 ? 1 : 0));
    }

    vm.populateSetupSec1Data();
    /* Section 1 data */

    /* Section 2 data */
    vm.populateSetupSec2Data = function () {
        vm.setupSec2Props = [];
        if (vm.settings && vm.settings.setup && vm.settings.setup.primary) {
            for (var property in vm.settings.setup.primary) {
                if (!vm.settings.setup.primary[property].ui.inWidget && vm.settings.setup.primary[property].ui.section === 2) {
                    vm.setupSec2Props.push({ "prop": property, "isPrimary": true, "sort": vm.settings.setup.primary[property].ui.sort });
                }
            }
        }

        if (vm.settings && vm.settings.setup && vm.settings.setup.custom) {
            for (var property in vm.settings.setup.custom) {
                if (!vm.settings.setup.custom[property].ui.inWidget && vm.settings.setup.custom[property].ui.section === 2) {
                    vm.setupSec2Props.push({ "prop": property, "isPrimary": false, "sort": vm.settings.setup.custom[property].ui.sort });
                }
            }
        }

        vm.setupSec2Props = $filter('orderBy')(vm.setupSec2Props, 'sort', false);
        vm.numSec2Rows = new Array(parseInt(vm.setupSec2Props.length / 3, 10) + (vm.setupSec2Props.length % 3 > 0 ? 1 : 0));
    }

    vm.populateSetupSec2Data();
    /* Section 1 data */

    vm.include = function (uig, isPrimary) {
        if (isPrimary && vm.settings && vm.settings.setup && vm.settings.setup.primary) {
            for (var property in vm.settings.setup.primary) {
                if (vm.settings.setup.primary[property].ui.inWidget && vm.settings.setup.primary[property].ui.uiGroup === uig) {
                    vm.settings.setup.primary[property].ui.inWidget = false;
                    if (vm.settings.setup.primary[property].ui.section === 1) {
                        if (vm.setupSec1Props && vm.setupSec1Props.length > 0)
                            vm.settings.setup.primary[property].ui.sort = vm.setupSec1Props[vm.setupSec1Props.length - 1].sort + 1;

                        vm.populateSetupSec1Data();
                    }
                    else if (vm.settings.setup.primary[property].ui.section === 2) {
                        if (vm.setupSec2Props && vm.setupSec2Props.length > 0)
                            vm.settings.setup.primary[property].ui.sort = vm.setupSec2Props[vm.setupSec2Props.length - 1].sort + 1;

                        vm.populateSetupSec2Data();
                    }
                }
            }
        }
        else if (!isPrimary && vm.settings && vm.settings.setup && vm.settings.setup.custom) {
            for (var property in vm.settings.setup.custom) {
                if (vm.settings.setup.custom[property].ui.inWidget && vm.settings.setup.custom[property].ui.uiGroup === uig) {
                    vm.settings.setup.custom[property].ui.inWidget = false;
                    if (vm.settings.setup.custom[property].ui.section === 1) {
                        if (vm.setupSec1Props && vm.setupSec1Props.length > 0)
                            vm.settings.setup.custom[property].ui.sort = vm.setupSec1Props[vm.setupSec1Props.length - 1].sort + 1;

                        vm.populateSetupSec1Data();
                    }
                    else if (vm.settings.setup.custom[property].ui.section === 2) {
                        if (vm.setupSec2Props && vm.setupSec2Props.length > 0)
                            vm.settings.setup.custom[property].ui.sort = vm.setupSec2Props[vm.setupSec2Props.length - 1].sort + 1;

                        vm.populateSetupSec2Data();
                    }
                }
            }
        }
    };

    vm.save = function () {
		requisionService.saveRequisition(vm.requisition).then(function(result){
			console.log(result);
            alert(result.data.message);
		});
	};

    vm.submit  = function() {
        requisionService.submitRequisition(vm.requisition).then(function(result){
            console.log(result);
            alert(result.data.message);
        });
    };
}