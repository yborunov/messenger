angular.module('messenger')
.controller('MessagesCtrl', ['$scope', '$location', '$http', 'Session', 'Messages', function($scope, $location, $http, Session, Messages) {
	if (!Session.id) {
		$location.path('/login');
		return false;
	}

	$scope.$watch(function() {
		return Messages.list;
	}, function() {
		$scope.messagesList = Messages.list;
	});

	$http.get('https://treadstone-testdev.testschoolmessenger.com/v1/messageGroups', {
		headers: {
			'Sm-App-SessionId': Session.id
		}
	}).then(function(response) {
		if (Array.isArray(response.data)) {
			Messages.list = response.data;
		} else {
			$scope.errorMessage = 'Error fetching messages';
		}
	}, function(response) {
		$scope.errorMessage = response.statusText;
	});
}]);