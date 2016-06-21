app.component('projekty', {
	template: `
				<h2>Projekty</h2>
				<zobraz-udaje udaje="$ctrl.vysledok" druh="$ctrl.druhUdajov"></zobraz-udaje>
			`,

	controller: function($http, DataServis, $rootScope) {
		_this = this;

		_this.query = function(co) {
			DataServis.query(co).then(function(resp) {
				_this.vysledok = resp.data;
				_this.druhUdajov = co;
			});
		}

		_this.query('projekty');

		$rootScope.$on('pridanyProjekt', function(e, d) {
			_this.query('projekty');
		});
	}
});
