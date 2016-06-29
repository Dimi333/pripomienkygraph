app.component('uzivatel', {
	bindings: {
		idu: "@"
	},
	templateUrl: 'app/uzivatel/uzivatel.html',

	controller: function($http, DataServis, $rootScope) {
		_this = this;
		_this.ds = DataServis;

		_this.query = function(co, id) {
			DataServis.query2(co, id).then(function(resp) {
				if(_this.ds.prihlaseny) {
					_this.vysledok = resp.data;
					_this.meno = _this.vysledok[0].u.properties.meno;
					_this.heslo = _this.vysledok[0].u.properties.heslo;
					_this.mejl = _this.vysledok[0].u.properties.mejl;
					_this.druhUdajov = co;
				} else {
					alert('Musíte sa prihlásiť!')
				}
			});
		}

		_this.query('uzivatel', _this.idu);
	}
});
