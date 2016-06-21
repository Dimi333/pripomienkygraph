app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
		.when('/prihlasenie', {
			template: '<prihlasenie></prihlasenie>'
		})
		.when('/projekty', {
			template: '<projekty></projekty><br><pridaj co="projekt"></pridaj>'
		})
		.when('/projekt/:id', {
			template: '<projekt pid="{{$ctrl.id}}"></projekt>',
			controller: function($routeParams) {
				_this = this;
				_this.id = $routeParams.id;
			},
			controllerAs: '$ctrl',
			bindToController: 'true'
		})
		.when('/pripomienka/:id', {
			template: 'pripomienka ID {{$ctrl.id}}',
			controller: function($routeParams) {
				_this = this;
				_this.id = $routeParams.id;
			},
			controllerAs: '$ctrl',
			bindToController: 'true'
		})
		.when('/pripomienky', {
			template: '<pripomienky></pripomienky>'
		})
		.when('/uzivatelia', {
			template: '<uzivatelia></uzivatelia><br><pridaj co="uzivatel"></pridaj>'
		})
		.when('/uzivatel/:id', {
			template: '<uzivatel idu="{{$ctrl.id}}"></uzivatel>',
			controller: function($routeParams) {
				_this = this;
				_this.id = $routeParams.id;
			},
			controllerAs: '$ctrl',
			bindToController: 'true'
		})
		.otherwise({
			redirectTo: '/projekty'
		});

		$locationProvider.html5Mode(true).hashPrefix('*');

		/*$httpProvider.defaults.headers.common = {};
		$httpProvider.defaults.headers.post = {};
		$httpProvider.defaults.headers.put = {};
		$httpProvider.defaults.headers.patch = {};*/
}]);

app.run(function($rootScope, $location, DataServis) {
	// keep user logged in after page refresh
	if (!DataServis.prihlaseny) {
		$location.path('/prihlasenie');
	}

	//vráti ho na login keď nieje prihlásený
	$rootScope.$on('$locationChangeStart', function (event, next, current) {
		if(!DataServis.prihlaseny) { // true|false
			$location.path('/prihlasenie');
		}

		var publicPages = ['/prihlasenie'];
		var restrictedPage = publicPages.indexOf($location.path()) === -1;
		if (restrictedPage && !DataServis.prihlaseny) {
			$location.path('/prihlasenie');
		}
	});
});
