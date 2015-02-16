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
	$rootScope.$on('$routeChangeSuccess', function(){
		$rootScope.loader = true;
		$rootScope.data = {};
		$rootScope.data.img_ratio = '';
		if(window.devicePixelRatio > 1){
			$rootScope.data.img_ratio = '_2x';
		}
		$rootScope.data.domain = document.domain;
		if($rootScope.data.domain == ''){
			$rootScope.document_root = '/www/';
			$rootScope.data.domain = 'ja.osaka.ramen.autham.net';
		}
		$rootScope.data.language = $rootScope.data.domain.split('.')[0];
		$rootScope.data.area = $rootScope.data.domain.split('.')[1];
		$rootScope.data.siteGenre = $rootScope.data.domain.split('.')[2];
		$rootScope.data.requestUrl = $location.$$path;
		var requestUrl = $rootScope.data.requestUrl;
		if($rootScope.data.requestUrl.substr(-1) != '/'){
			var requestUrl = $rootScope.data.requestUrl + '/';
		}
		$rootScope.query = window.location.search.substring(1);
		if($rootScope.query != ''){
			$rootScope.queryString = '?' + $rootScope.query;
		}else{
			$rootScope.queryString = '';
		}
		console.log($rootScope.queryString);
		var requestTo = 'http://api.' + $rootScope.data.siteGenre + '.autham.net' + requestUrl + $rootScope.data.language + '/' + $rootScope.data.area + $rootScope.queryString;
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
		// show first accordion
		$rootScope.showFirstAccordion = function(target){
			$rootScope[target] = {};
			$rootScope[target][0] = 'in';
		}
		// show all accordion
		$rootScope.showAllAccordion = function(listData, target){
			$rootScope[target] = {};
			for(i in listData){
				$rootScope[target][i] = 'in';
			}
		}
		// prevent automatic sort
		$rootScope.notSorted = function(obj){
			if (!obj) {
				return [];
			}
			return Object.keys(obj);
		}
		// get review average
		$rootScope.getReviewAverage = function(obj){
			var sums = 0;
			for(i in obj){
				sums = sums + parseInt(obj[i].rate);
			}
			var average = {};
			average.raw = sums / obj.length;
			average.floor = Math.floor(average.raw);
			return average;
		}
		// convert string to json
		$rootScope.stringToJson = function(jsonString){
			return $.parseJSON(jsonString);
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
