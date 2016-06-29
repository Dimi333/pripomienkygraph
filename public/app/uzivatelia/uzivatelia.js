app.component('uzivatelia', {
	templateUrl: 'app/uzivatelia/uzivatelia.html',

	controller: function($rootScope, $http, DataServis) {
		_this = this;

		_this.query = function(co) {
			DataServis.query(co).then(function(resp) {
				_this.vysledok = resp.data;
				_this.druhUdajov = co;
			});
		}

		$rootScope.$on('pridanyProjekt', function(e, d) {
			_this.query('uzivatelia');
		});

		_this.query('uzivatelia');
	}
});
