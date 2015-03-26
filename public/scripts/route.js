Autham.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/templates/index.html',
			controller: 'IndexCtrl'
		})
		.when('/stations', {
			templateUrl: '/templates/stations.html',
			controller: 'StationsCtrl'
		})
		.when('/stations/:stations', {
			templateUrl: '/templates/lists.html',
			controller: 'ListsCtrl'
		})
		.when('/areas', {
			templateUrl: '/templates/areas.html',
			controller: 'AreasCtrl'
		})
		.when('/areas/:areas', {
			templateUrl: '/templates/lists.html',
			controller: 'ListsCtrl'
		})
		.when('/freewords', {
			templateUrl: '/templates/freewords.html',
			controller: 'FreewordsCtrl'
		})
		.when('/freewords/:freewords', {
			templateUrl: '/templates/lists.html',
			controller: 'ListsCtrl'
		})
		.when('/details', {
			templateUrl: '/templates/details.html',
			controller: 'DetailCtrl'
		})
		.when('/search', {
			templateUrl: '/templates/lists.html',
			controller: 'SearchCtrl'
		})
		.when('/terms', {
			templateUrl: '/templates/terms.html',
			controller: 'TermsCtrl'
		})
		.when('/privacy', {
			templateUrl: '/templates/privacy.html',
			controller: 'PrivacyCtrl'
		})
		.when('/act', {
			templateUrl: '/templates/act.html',
			controller: 'ActCtrl'
		})
		/*
		.otherwise({
			redirectTo: '/'
		})
		*/
}]);
