(function() {
    'use strict';
    angular
        .module('imagingApp')
        .factory('Job', Job);

    Job.$inject = ['$resource', 'DateUtils'];

    function Job ($resource, DateUtils) {
        var resourceUrl =  'api/jobs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.lastStart = DateUtils.convertLocalDateFromServer(data.lastStart);
                    data.lastStop = DateUtils.convertLocalDateFromServer(data.lastStop);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.lastStart = DateUtils.convertLocalDateToServer(data.lastStart);
                    data.lastStop = DateUtils.convertLocalDateToServer(data.lastStop);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.lastStart = DateUtils.convertLocalDateToServer(data.lastStart);
                    data.lastStop = DateUtils.convertLocalDateToServer(data.lastStop);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
