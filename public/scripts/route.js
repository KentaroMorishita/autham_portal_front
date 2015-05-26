Autham.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/templates/index.html',
			controller: 'IndexCtrl'
		})
		.when('/station', {
			templateUrl: '/templates/stations.html',
			controller: 'StationsCtrl'
		})
		.when('/station/:stations', {
			templateUrl: '/templates/lists.html',
			controller: 'ListsCtrl'
		})
		.when('/area', {
			templateUrl: '/templates/areas.html',
			controller: 'AreasCtrl'
		})
		.when('/area/:areas', {
			templateUrl: '/templates/lists.html',
			controller: 'ListsCtrl'
		})
		.when('/category', {
			templateUrl: '/templates/categories.html',
			controller: 'CategoriesCtrl'
		})
		.when('/category/:categories', {
			templateUrl: '/templates/lists.html',
			controller: 'ListsCtrl'
		})
		.when('/freeword', {
			templateUrl: '/templates/freewords.html',
			controller: 'FreewordsCtrl'
		})
		.when('/freeword/:freewords', {
			templateUrl: '/templates/lists.html',
			controller: 'ListsCtrl'
		})
		.when('/detail', {
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
