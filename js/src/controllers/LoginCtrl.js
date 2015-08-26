angular.module('messenger')
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Session', function($scope, $http, $location, Session) {
	if (sessionStorage.getItem('sessionData')) {
		var sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
		Session.id = sessionData.id;
		Session.auth = sessionData.auth;
		Session.customer = sessionData.customer;
		Session.user = sessionData.user;

		$location.path('/messages');
		return true;
	}

	$scope.signinForm = {};
	$scope.signin = function() {
		$http.post('https://treadstone-testdev.testschoolmessenger.com/v1/sessions', {
			'username': $scope.signinForm.username,
			'password': $scope.signinForm.password,
			'customerKey': 'interview'
		}).then(function(response) {
			if (typeof response.headers === 'function' &&
				response.data.auth && response.data.customer && response.data.user) {

				Session.id = response.headers('Sm-App-SessionId');
				Session.auth = response.data.auth;
				Session.customer = response.data.customer;
				Session.user = response.data.user;

				sessionStorage.setItem('sessionData', JSON.stringify(Session));

				$location.path('/messages');
			} else {
				$scope.errorMessage = 'Incorrect response';
			}
		}, function(response) {
			$scope.errorMessage = response.statusText;
		});
	};
}]);