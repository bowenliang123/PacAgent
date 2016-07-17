'use strict';

angular.module('indexCtrl', [])
    .controller('indexCtrl', function ($scope, Proxy, Rule) {
        $scope.proxyName = 'bowen';
        $scope.text = '';
        $scope.proxy;
        $scope.isShowInputNewProxyPath = true;
        $scope.newProxyPath = '';

        $scope.origin=location.href;

        $scope.loadProxy = ()=> {
            let proxys = Proxy.query(()=> {
                $scope.proxy = proxys[0];
            });

            $scope.viewPac($scope.proxyName);

        };

        $scope.onClickAddRule = ()=> {
            // $scope.isShowInputNewProxyPath = !$scope.isShowInputNewProxyPath;
            if (!$scope.proxy) {
                $scope.proxy = {name: $scope.proxyName, rules: [], createTime: new Date(), updateTime: new Date()};
            }


            // 增加规则
            $scope.proxy.rules.unshift({proxyPath: $scope.newProxyPath, isEnabled: true});

            // 更新时间
            $scope.proxy.updateTime = new Date();

            // 执行
            Proxy.save({id: $scope.proxy.id}, $scope.proxy,()=>{
                $scope.loadProxy();
            });

            console.log('onClickAddRule' + $scope.newProxyPath);


        };

        $scope.viewPac = (name)=> {
            $.get('/pac/' + name, (data)=> {
                $scope.text = data;
                $scope.$apply();
            })
        };

        $scope.onChangeIsEnabled = (rule)=> {
            rule.isEnabled = !rule.isEnabled;
            console.log('onChangeIsEnable');

            // 更新时间
            $scope.proxy.updateTime = new Date();

            // 执行
            Proxy.save({id: $scope.proxy.id}, $scope.proxy, () => {
                $scope.loadProxy();
            });
        };

        $scope.onClickDeleteRule = (rule)=> {
            // 执行
            Rule.delete({id: rule.id}, () => {
                $scope.loadProxy();
            });
        };


        $scope.loadProxy();
    });
