// custom filters
var customFilters = angular.module('customFilters', []);
// remove slash filter
customFilters.filter('removeSymbols', function(){
	return function(input){
		if(typeof input == 'undefined'){
			return '';
		}
		var removed = input.replace(/[\!\"\#\$\%\&\'\(\)\=\-\~\^\|\`\@\[\]\{\}\*\:\;\?\.\,<>_\/]+/g, '');
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

// decodeURIComponent filter
customFilters.filter('decodeURIComponent', function(){
	return function(input){
		if(typeof input == 'undefined'){
			return '';
		}
		var decoded = decodeURIComponent(decodeURIComponent(input));
		return decoded;
	};
});

// convert json to query string
customFilters.filter('jsonToQueryString', function(){
	return function(input){
		if(typeof input == 'undefined'){
			return '';
		}
		var queryString = $.param(input);
		return queryString;
	}
});

// make list params
customFilters.filter('makeListBaseParams', function(){
	return function(substrings){
		return substrings.replace(/\&*display_way=[a-z0-9]+/,'').replace(/\&page=\w+/,'').replace(/\&per-page=\w+/,'').replace(/\&order=\w+/,'');
	}
});

