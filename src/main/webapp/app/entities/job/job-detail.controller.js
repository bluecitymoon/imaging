(function() {
    'use strict';

    angular
        .module('imagingApp')
        .controller('JobDetailController', JobDetailController);

    JobDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Job'];

    function JobDetailController($scope, $rootScope, $stateParams, entity, Job) {
        var vm = this;
        vm.job = entity;
        vm.load = function (id) {
            Job.get({id: id}, function(result) {
                vm.job = result;
            });
        };
        var unsubscribe = $rootScope.$on('imagingApp:jobUpdate', function(event, result) {
            vm.job = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
