app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/projekty', {
			template: '<projekty></projekty>'
		})
		.when('/projekt/:id', {
			template: 'projekt {{$ctrl.id}}',
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
			template: '<uzivatelia></uzivatelia>'
		})
		.when('/pridajProjekt', {
			template: '<pridaj co="projekt"></pridaj>'
		})
		.when('/pridajPripomienku', {
			template: '<pridaj co="pripomienka"></pridaj>'
		})
		.when('/pridajUzivatela', {
			template: '<pridaj co="uzivatel"></pridaj>'
		})
		.otherwise({
			redirectTo: '/projekty'
		});

		$locationProvider.html5Mode(true).hashPrefix('*');
}]);