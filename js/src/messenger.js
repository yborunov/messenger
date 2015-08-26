
angular.module('messenger', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/messages', {
			templateUrl: 'messages.html',
			controller: 'MessagesCtrl'
		})
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'LoginCtrl'
		})
		.otherwise({
			redirectTo: '/login'
		});
}]);