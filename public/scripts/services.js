angular.module('services', []).factory("commonService", function($rootScope, $http){
	return {
		// judge boolean from string
		judgeBoolean: function(booleanString){
			if(typeof booleanString == undefined){
				return false;
			}
			if(booleanString == 'true' || booleanString == true){
				return true;
			}else{
				return false;
			}
		},
		// reload stations 
		reloadStations: function(lineId, stationSearchFlag){
			if(typeof lineId == 'undefined'){
				return false;
			}
			if(typeof stationSearchFlag != 'undefined'){
				if(typeof $rootScope.loaderStation == 'undefined'){
					$rootScope.loaderStation = {};
				}
				$rootScope.loaderStation[lineId] = true;
			}
			var requestTo = 'http://api.' + $rootScope.data.siteGenre + '.autham.net/stations/lists/' + $rootScope.data.language + '/' + $rootScope.data.area + $rootScope.queryString;
			$http.jsonp(requestTo, {params: {callback: 'JSON_CALLBACK', 'line-id': lineId}})
			.success(function(data, status, headers, config){
				if(typeof stationSearchFlag == 'undefined'){
					$rootScope.data.remote.stations = data;
					$rootScope.data.search.station = data[0].code;
				}else{
					if(typeof $rootScope.data.stations == 'undefined'){
						$rootScope.data.stations = {};
					}
					$rootScope.data.stations[lineId] = data;
					$rootScope.loaderStation[lineId] = false;
				}
			})
			.error(function(data, status, headers, config){
			});
		},
		// reload areas 
		reloadAreas: function(areaGroupId){
			if(typeof areaGroupId == 'undefined'){
				return false;
			}
			var requestTo = 'http://api.' + $rootScope.data.siteGenre + '.autham.net/areas/lists/' + $rootScope.data.language + '/' + $rootScope.data.area + $rootScope.queryString;
			$http.jsonp(requestTo, {params: {callback: 'JSON_CALLBACK', 'area-group-id': areaGroupId}})
			.success(function(data, status, headers, config){
				$rootScope.data.remote.areas = data;
				$rootScope.data.search.area = data[0].code;
			})
			.error(function(data, status, headers, config){
			});
		},
		// convert string to json
		stringToJson: function(jsonString){
			return $.parseJSON(jsonString);
		},
		// get review average
		getReviewAverage: function(obj){
			var sums = 0;
			for(i in obj){
				sums = sums + parseInt(obj[i].rate);
			}
			var average = {};
			average.raw = sums / obj.length;
			average.floor = Math.floor(average.raw);
			return average;
		},
		// prevent automatic sort
		notSorted: function(obj){
			if (!obj) {
				return [];
			}
			return Object.keys(obj);
		},
		// show all accordion
		showAllAccordion: function(listData, target){
			if(typeof $rootScope.data[target] == 'undefined'){
				$rootScope.data[target] = {};
			}
			for(i in listData){
				$rootScope.data[target][listData[i].id] = 'in';
			}
		},
		// show first accordion
		showFirstAccordion: function(target){
			$rootScope[target] = {};
			$rootScope[target][0] = 'in';
		},
		// open and close accord
		accordToggle: function(target, index){
			if(typeof $rootScope.data[target] == 'undefined'){
				$rootScope.data[target] = {};
			}
			if(typeof $rootScope.data[target][index] != 'undefined'){
				if($rootScope.data[target][index] == 'in'){
					$rootScope.data[target][index] = '';
				}else{
					$rootScope.data[target][index] = 'in';
				}
			}else{
				$rootScope.data[target][index] = 'in';
			}
		},
		// switch sub tab
		switchSubTab: function(obj){
			$rootScope.subtabindex = obj.$index;
		},
		// search station by word
		searchStationByWord: function(word, event){
			if(event.keyCode == 13){
				event.target.blur();
			}
			if(typeof $rootScope.data.remote != 'undefined'){
				for(i in $rootScope.data.remote.station_line_groups){
					var thisLineGroupId = $rootScope.data.remote.station_line_groups[i].id;
					$rootScope.commonService.showAllAccordion($rootScope.data.remote.station_lines[thisLineGroupId], 'acosubclass');
					if(typeof $rootScope.data.stationLineGroupsHide == 'undefined'){
						$rootScope.data.stationLineGroupsHide = {};
					}
					$rootScope.data.stationLineGroupsHide[thisLineGroupId] = true;
					for(j in $rootScope.data.remote.station_lines[thisLineGroupId]){
						var thisLineId = $rootScope.data.remote.station_lines[thisLineGroupId][j].id;
						if(typeof $rootScope.data.stationLineHide == 'undefined'){
							$rootScope.data.stationLineHide = {};
						}
						$rootScope.data.stationLineHide[thisLineId] = true;
						for(k in $rootScope.data.stations[thisLineId]){
							var thisStationId = $rootScope.data.stations[thisLineId][k].id;
							if(typeof $rootScope.data.stationHide == 'undefined'){
								$rootScope.data.stationHide = {};
							}
							if($rootScope.data.stations[thisLineId][k][$rootScope.data.language].indexOf(word) == -1 && word != ''){
								$rootScope.data.stationHide[thisStationId] = true;
							}else{
								$rootScope.data.stationHide[thisStationId] = false;
								$rootScope.data.stationLineHide[thisLineId] = false;
								$rootScope.data.stationLineGroupsHide[thisLineGroupId] = false;
							}
						}
					}
				}
			}
		},
		// format date
		dateFormat: function(rawString){
			if(typeof rawString == 'undefined'){
				return false;
			}	
			var monthNames = new Array("January", "February", "March", 
					"April", "May", "June", "July", "August", "September", 
					"October", "November", "December");
			var rawString = rawString.replace(/-/g, '/');
			var newDate = new Date(rawString);
			var year = newDate.getFullYear();
			var month = newDate.getMonth();
			var date = newDate.getDate();
			if($rootScope.data.language == 'ja'){
				return year + '年' + month + '月' + date + '日';
			}else{
				return monthNames[month] + ' ' + date + ', ' + year;
			}	
		}	

	}
});
