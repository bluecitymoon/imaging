(function() {
    'use strict';

    angular
        .module('imagingApp')
        .controller('JobDialogController', JobDialogController);

    JobDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Job'];

    function JobDialogController ($scope, $stateParams, $uibModalInstance, entity, Job) {
        var vm = this;
        vm.job = entity;
        vm.load = function(id) {
            Job.get({id : id}, function(result) {
                vm.job = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('imagingApp:jobUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.job.id !== null) {
                Job.update(vm.job, onSaveSuccess, onSaveError);
            } else {
                Job.save(vm.job, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.lastStart = false;
        vm.datePickerOpenStatus.lastStop = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
