angular.module('exAnApp', ['ngRoute'])

	.config(function ($routeProvider) {
		$routeProvider.
			when('/articles', {templateUrl: 'app/tpl/list.tpl.html', controller: 'ArticlesListCtrl'}).
			when('/article/:id', {templateUrl: 'app/tpl/details.tpl.html', controller: 'ArticleDetailCtrl'}).
			when('/article_new', {templateUrl: 'app/tpl/form.tpl.html', controller: 'ArticleCreateCtrl'}).
			when('/article_remove/:id', {template: 'ok', controller: 'ArticleRemoveCtrl'}).
			otherwise({redirectTo: '/articles'});
	})

	.controller('ArticlesListCtrl', function ($scope, $http) {
		$http.get('/api/articles').
			success(function (data, status, headers, config) {
				$scope.articles = data;
			});
	})

	.controller('ArticleDetailCtrl', function ($scope, $routeParams, $http) {
		$http.get('/api/articles/' + $routeParams.id).
			success(function (data, status, headers, config) {
				$scope.article = data;
			});

		$scope.submit = function () {

			var newArticle = {
				name: $scope.article.name,
				desc: $scope.article.desc
			};

			$http.put('/api/articles/' + $scope.article._id, newArticle).
				success(function (data, status, headers, config) {
					$scope.message = data.message;
				});
		};
	})

	.controller('ArticleCreateCtrl', function ($scope, $routeParams, $http) {
		$scope.submit = function () {

			var newArticle = {
				name: $scope.name,
				desc: $scope.desc
			};

			$http.post('/api/articles/', newArticle).
				success(function (data, status, headers, config) {
					$scope.message = data.message;
				});

			$scope.name = "";
			$scope.desc = "";
		};
	})

	.controller('ArticleRemoveCtrl', function ($scope, $routeParams, $http, $location) {
		$http.delete('/api/articles/' + $routeParams.id).
			success(function (data, status, headers, config) {
				//$scope.message = data.message;
				$location.path("/articles");
			});
	})
;