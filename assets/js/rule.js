angular.module('app')
    .factory('Rule', ['$resource', function($resource){
        return $resource('/rule/:id', null, {
            // action1: {
            //     method: 'GET',
            //     url: 'someOtherUrl',
            //     isArray: true
            // }
        });
    }]);