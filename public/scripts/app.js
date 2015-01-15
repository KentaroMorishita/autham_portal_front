var Autham = angular.module('Autham',['ngRoute','customFilters']);
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
		/*
		.otherwise({
			redirectTo: '/'
		})
		*/
}]);
Autham.config(['$locationProvider', function($locationProvider){
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}]);
Autham.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.withCredentials = true;
}]);
Autham.run(function($rootScope, $routeParams, $location, $http, $interpolate){
	$rootScope.$watch(function(){
		return $location.path();
	},
	function(pathname){
		$rootScope.loader = true;
		$rootScope.data = {};
		$rootScope.data.img_ratio = '';
		if(window.devicePixelRatio > 1){
			$rootScope.data.img_ratio = '_2x';
		}
		$rootScope.data.domain = document.domain;
		$rootScope.data.language = document.domain.split('.')[0];
		$rootScope.data.area = document.domain.split('.')[1];
		$rootScope.data.siteGenre = document.domain.split('.')[2];
		$rootScope.data.requestUrl = pathname;
		if($rootScope.data.requestUrl.substr(-1) != '/'){
			$rootScope.data.requestUrl = $rootScope.data.requestUrl + '/';
		}
		var requestTo = 'http://api.' + $rootScope.data.siteGenre + '.autham.net' + $rootScope.data.requestUrl + $rootScope.data.language + '/' + $rootScope.data.area;
		$http.jsonp(requestTo, {params: {callback: 'JSON_CALLBACK'}})
		.success(function(data, status, headers, config){
			$rootScope.data.remote = data;
			$rootScope.data.remote = $.parseJSON($interpolate(JSON.stringify(data))($rootScope));
			$rootScope.loader = false;
		})
		.error(function(data, status, headers, config){
			$rootScope.loader = false;
		});
		// switch sub tab
		$rootScope.switchSubTab = function(obj){
			$rootScope.subtabindex = obj.$index;
		}
		// open and close accord
		$rootScope.accordToggle = function(target, index){
			if(typeof $rootScope[target] == 'undefined'){
				$rootScope[target] = {};
			}
			if(typeof $rootScope[target][index] != 'undefined'){
				if($rootScope[target][index] == 'in'){
					$rootScope[target][index] = '';
				}else{
					$rootScope[target][index] = 'in';
				}
			}else{
				$rootScope[target][index] = 'in';
			}
		}
		// prevent automatic sort
		$rootScope.notSorted = function(obj){
			if (!obj) {
				return [];
			}
			return Object.keys(obj);
		}
	});
});

// custom filters
var customFilters = angular.module('customFilters', []);
// remove slash filter
customFilters.filter('removeSymbols', function(){
	return function(input){
		if(typeof input == 'undefined'){
			return '';
		}
		var removed = input.replace(/[\!\"\#\$\%\&\'\(\)\=\-\~\^\|\`\@\[\]\{\}\*\:\;\?\.\,<>_\/]+/g, '');
		console.log(removed);
		return removed;
	};
});
// encodeURIComponent filter
customFilters.filter('encodeURIComponent', function(){
	return function(input){
		if(typeof input == 'undefined'){
			return '';
		}
		var encoded = encodeURIComponent(encodeURIComponent(input));
		return encoded;
	};
});

Autham.controller('IndexCtrl', ['$scope', '$http', '$rootScope', function($scope,$http,$rootScope){
}]);
Autham.controller('StationsCtrl', ['$scope', '$http', '$rootScope', function($scope,$http,$rootScope){
	// create station url
	$scope.createStationUrl = function(station_code, state, station_id){
		if(typeof $scope.selected_stations == 'undefined'){
			$scope.selected_stations = [];
		}
		if(state){
			if($scope.selected_stations.length >= $scope.data.remote.settings.max_station_select){
				alert($rootScope.data.remote.texts.max_selected_error);
				return false;
			}
			$scope.selected_stations.push(station_code);
			var thisState = true;
		}else{
			$scope.selected_stations = $.grep($scope.selected_stations, function(value){
				return value != station_code;
			});
			var thisState = false;
		}
		$scope.selected_stations.sort();
		$scope.selected_stations = $.unique($scope.selected_stations);
		$scope.station_url = $scope.selected_stations.join('-');
		return thisState;
	}
}]);
Autham.controller('AreasCtrl', ['$scope', '$http', '$rootScope', function($scope,$http,$rootScope){
	// create area url
	$scope.createAreaUrl = function(area_code, state){
		if(typeof $scope.selected_areas == 'undefined'){
			$scope.selected_areas = [];
		}
		if(state){
			if($scope.selected_areas.length >= $scope.data.remote.settings.max_area_select){
				alert($rootScope.data.remote.texts.max_selected_error);
				return false;
			}
			$scope.selected_areas.push(area_code);
			var thisState = true;
		}else{
			$scope.selected_areas = $.grep($scope.selected_areas, function(value){
				return value != area_code;
			});
			var thisState = false;
		}
		$scope.selected_areas.sort();
		$scope.area_url = $scope.selected_areas.join('-');
		return thisState;
	}
}]);
Autham.controller('FreewordsCtrl', ['$scope', '$http', '$rootScope', function($scope,$http,$rootScope){
}]);
Autham.controller('ListsCtrl', ['$scope', '$http', '$rootScope', function($scope,$http,$rootScope){
	console.log($rootScope.data);
}]);
