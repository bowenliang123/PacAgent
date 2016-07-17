'use strict';

angular.module('indexCtrl', [])
    .controller('indexCtrl', ($scope) => {
        $scope.proxyName = 'bowen';
        $scope.text = '';

        $scope.haha = ()=> {

            $.get('/pac/' + $scope.proxyName, (data)=> {
                $scope.text = data;
            })
        }
    });
