
angular.module('messenger', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/messeges', {
			templateUrl: 'messeges.html',
			controller: 'MessegesCtrl'
		})
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'LoginCtrl'
		})
		.otherwise({
			redirectTo: '/login'
		});
}]);