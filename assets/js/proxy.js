angular.module('app')
    .factory('Proxy', ['$resource', function($resource){
        return $resource('/proxy/:id', null, {
            // action1: {
            //     method: 'GET',
            //     url: 'someOtherUrl',
            //     isArray: true
            // }
        });
    }]);