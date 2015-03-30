var Autham = angular.module('Autham',['ngRoute','customFilters','services']);
Autham.config(['$locationProvider', function($locationProvider){
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}]);
Autham.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.withCredentials = true;
}]);

Autham.directive('searchConditionDirective', ['$rootScope', function($rootScope){
	return function(scope, element, attrs){
		if(scope.$last){
			$('.form_sliders').each(function(){
				var thisCode = $(this).attr('code');
				var thisMin = parseInt($(this).attr('range-min'));
				var thisMax = parseInt($(this).attr('range-max'));
				var thisPer	= parseInt($(this).attr('range-per'));
				var thisValue = new Array();
				thisValue[0] = thisMin;
				thisValue[1] = thisMax;
				if(typeof $rootScope.data.remote.searchs != 'undefined'){
					if(typeof $rootScope.data.remote.searchs.details[thisCode] != 'undefined'){
						thisValue[0] = $rootScope.data.remote.searchs.details[thisCode].min;
						thisValue[1] = $rootScope.data.remote.searchs.details[thisCode].max;
					}
				}
				$(this).slider({
					min: thisMin,
					max: thisMax,
					step: thisPer,
					range: true,
					values: [thisValue[0], thisValue[1]],
					slide: function(event, ui){
						scope.data.search.details[thisCode].min = ui.values[0];
						scope.data.search.details[thisCode].max = ui.values[1];
						scope.$apply();
					}
				});
			});
		}
	}
}]);

Autham.controller('FrontBaseCtrl', ['$scope', '$http', '$rootScope', '$routeParams', '$location', '$interpolate', 'commonService', function($scope, $http, $rootScope, $routeParams, $location, $interpolate, commonService){
	$rootScope.commonService = commonService;
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
}]);
Autham.controller('IndexCtrl', ['$scope', '$http', '$rootScope', '$controller', function($scope, $http, $rootScope, $controller){
	$controller('FrontBaseCtrl', { $scope: $scope });
}]);
Autham.controller('StationsCtrl', ['$scope', '$http', '$rootScope', '$controller', function($scope, $http, $rootScope, $controller){
	$controller('FrontBaseCtrl', { $scope: $scope });
	console.log($rootScope.data);
	// load Stations
	$rootScope.$watch('data.remote.station_line_groups', function(){
		if(typeof $rootScope.data.remote != 'undefined'){
			for(i in $rootScope.data.remote.station_line_groups){
				var thisLineGroupId = $rootScope.data.remote.station_line_groups[i].id;
				for(j in $rootScope.data.remote.station_lines[thisLineGroupId]){
					$scope.commonService.reloadStations($rootScope.data.remote.station_lines[thisLineGroupId][j].id, true);
				}
			}
		}
	});
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
Autham.controller('AreasCtrl', ['$scope', '$http', '$rootScope', '$controller', function($scope, $http, $rootScope, $controller){
	$controller('FrontBaseCtrl', { $scope: $scope });
	console.log($rootScope.data);
	$rootScope.$watch('data.remote.area_groups', function(){
		console.log(1);
		if(typeof $rootScope.data.remote != 'undefined'){
			console.log(2);
			$scope.commonService.showAllAccordion($rootScope.data.remote.area_groups, 'acoclass');
		}
	});
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
Autham.controller('FreewordsCtrl', ['$scope', '$http', '$rootScope', '$controller', function($scope, $http, $rootScope, $controller){
	$controller('FrontBaseCtrl', { $scope: $scope });
}]);
Autham.controller('ListsCtrl', ['$scope', '$http', '$rootScope', '$controller', '$timeout', function($scope, $http, $rootScope, $controller, $timeout){
	$controller('FrontBaseCtrl', { $scope: $scope });
}]);
Autham.controller('DetailCtrl', ['$scope', '$http', '$rootScope', '$controller', function($scope, $http, $rootScope, $controller){
	$controller('FrontBaseCtrl', { $scope: $scope });
	console.log($scope.data);
}]);
Autham.controller('SearchCtrl', ['$scope', '$http', '$rootScope', '$controller', function($scope, $http, $rootScope, $controller){
	$controller('FrontBaseCtrl', { $scope: $scope });
	/*
	$scope.$on('$viewContentLoaded', function(event) {
		console.log($scope.data);
	});
	*/
	console.log($scope.data);
}]);
Autham.controller('TermsCtrl', ['$scope', '$http', '$rootScope', '$controller', function($scope, $http, $rootScope, $controller){
	$controller('FrontBaseCtrl', { $scope: $scope });
}]);
Autham.controller('PrivacyCtrl', ['$scope', '$http', '$rootScope', '$controller', function($scope, $http, $rootScope, $controller){
	$controller('FrontBaseCtrl', { $scope: $scope });
}]);
Autham.controller('ActCtrl', ['$scope', '$http', '$rootScope', '$controller', function($scope, $http, $rootScope, $controller){
	$controller('FrontBaseCtrl', { $scope: $scope });
}]);
