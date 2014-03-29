var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'linksList.html',
    controller: 'appController'
  }).
  when('/create', {
    templateUrl: 'createLink.html',
    controller: 'Ctrl'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);

app.factory('linkServices', ['$http', function($http) {
  var getLinks = function() {
    return $http({
      method: 'GET',
      url: '/links'
    }).then(function(data) {
      console.log('DATA: ', data.data);
      return data.data;
    });
  };
  return { getLinks: getLinks };
}]);

app.controller('appController', function($scope, linkServices) {
  var links = linkServices.getLinks().then(function(data) {
    $scope.links = data;
  });
});

app.controller('Ctrl', function($scope, $http) {
  $scope.submit = function() {
    var url = this.userLink;
    $http({
      method: 'POST',
      url: '/links',
      data: {url: url}
    });
  };
});
