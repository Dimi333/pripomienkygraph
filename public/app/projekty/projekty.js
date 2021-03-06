app.component('projekty', {
	templateUrl: 'app/projekty/projekty.html',

	controller: function(DataServis, $rootScope) {
		_this = this;

		_this.query = function(co) {
			DataServis.query(co).then(function(resp) {
				_this.vysledok = resp.data;
				_this.druhUdajov = co;
			});
		};

		_this.query('projekty');

		$rootScope.$on('pridanyProjekt', function(e, d) {
			_this.query('projekty');
		});
	}
});
