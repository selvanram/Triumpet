angular.module('tp.auth',[])

.controller('AuthCtrl', function($scope, $window, $location, Auth){
	//Create a user, invoke on click
	$scope.create = function(){
		var newUser = {
			username  : $scope.username,
			password  : $scope.password,
			firstName : $scope.firstName,
			lastName  : $scope.lastName,
			email     : $scope.email
		}
		Auth.signup(newUser)
		  .then(function(token){
		  	//Save token and username to localStorage when sign up is successful
		  	$window.localStorage.setItem('com.triumpet.token',token);
		  	$window.localStorage.setItem('com.triumpet.username',newUser.username);
		  	//TODO: add location.path to direct to main page
		  	$scope.message = 'Success';
		  	$scope.username = '';
		  	$scope.password = '';
		  	$scope.firstName = '';
		  	$scope.lastName = '';
		  	$scope.email = '';
		  })
		  .catch(function(error){
		  	$scope.message = 'Please re-try';
		  	$scope.username = '';
		  	$scope.password = '';
		  	$scope.firstName = '';
		  	$scope.lastName = '';
		  	$scope.email = '';
		  })
	};

	//Login User
	$scope.login = function(username, password){
		var login = {
			username: username,
			password: password
		};
		Auth.signin(login)
		  .then(function(token){
		  	//Save token and username to localStorage when sign up is successful
		  	$window.localStorage.setItem('com.triumpet.token',token);
		  	$window.localStorage.setItem('com.triumpet.username',login.username);
		  	//TODO: add location.path to direct to main page
				$scope.message = 'Success';
		  	$scope.username = '';
		  	$scope.password = '';
		  })
		  .catch(function(error){
		  	$scope.message = 'Please re-try';
		  	$scope.username = '';
		  	$scope.password = '';
		  })
	};
})

.directive('tpAuth',function(){
	return {
		restrict: 'EA',
		scope: '=',
		replace: true,
		templateUrl:'../app/auth/auth.html',
		link: function(scope, el, attr){
		}
	}
})

.directive('tpSignUp',function(){
	return {
		restrict: 'EA',
		scope: '=',
		templateUrl:'../app/auth/signup.html',
		link: function(scope, el, attr){
		}
	}
})

.directive('tpSignIn',function(){
	return {
		restrict: 'EA',
		scope: '=',
		templateUrl:'../app/auth/signin.html',
		link: function(scope, el, attr){
		}
	}
})

