app.config(['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider', function($routeProvider, $locationProvider, $httpProvider, $compileProvider) {
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
			template: '<pripomienka id="{{$ctrl.id}}"></pripomienka>',
			controller: function($routeParams) {
				_this = this;
				_this.id = $routeParams.id;
			},
			controllerAs: '$ctrl',
			bindToController: 'true'
		})
		.when('/pripomienky', {
			template: '<h2>Všetky pripomienky</h2><pripomienky></pripomienky>'
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

		$compileProvider.debugInfoEnabled(false);
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

app.filter('akNieje', function() {
    return function(input, defaultValue) {
        if (angular.isUndefined(input) || input === null || input === '') {
            return defaultValue;
        }

        return input;
    }
});
