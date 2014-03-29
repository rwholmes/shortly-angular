var app = angular.module('app', []);

// angular.module('app.services', [])
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
  // console.log('linkServices: ', linkServices.linkServices);
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

// Added app declaration at top. Replaced angular.module... with app.
// added html extensions to login and signup
