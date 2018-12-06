angular
.module("HAProxyUI", [])
.filter("momentSecondsFrom", () => val => moment().subtract(val, 'seconds').fromNow())
.filter("convertBytes", () => val => {
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (val == 0) return '0 B';
    let i = parseInt(Math.floor(Math.log(val) / Math.log(1024)));
    return Math.round(val / Math.pow(1024, i), 2) + ' ' + sizes[i];
})
.controller("MainCtrl", ["$scope", "$http", "$interval", function($scope, $http, $interval){
    $scope.stats = [];

    $scope.activePage = "stats";
    
    $scope.loadStats = () => {
        $http.get("/api/stats").then(resp => {
            $scope.stats = resp.data;
        });
    };

    $scope.frontends = () => {
        let frontends = $scope.stats.filter(s => s.svname == "FRONTEND");
        return frontends;
    };

    $scope.backends = () => {
        let backends = $scope.stats.filter(s => s.svname == "BACKEND");
        for (let b of backends) {
            b.servers = $scope.stats.filter(s => (s.svname != "BACKEND" && s.svname != "FRONTEND" && s.pxname == b.pxname));
        }
        return backends;
    };

    $scope.loadStats();

    $interval(() => {
        $scope.loadStats();
    }, 5000);
}]);