app.component('uzivatelia', {
	template: `
				<zobraz-udaje udaje="$ctrl.vysledok" druh="$ctrl.druhUdajov"></zobraz-udaje>
			`,

	controller: function($http, DataServis) {
		_this = this;

		_this.query = function(co) {
			DataServis.query(co).then(function(resp) {
				_this.vysledok = resp.data;
				_this.druhUdajov = co;
			});
		}

		_this.query('uzivatelia');
	}
});
