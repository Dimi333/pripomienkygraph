app.component('uzivatel', {
	bindings: {
		idu: "@"
	},
	template: `
				ID: {{$ctrl.idu}}<br>
				Meno: <input type="text" ng-model="$ctrl.meno"><br>
				Heslo: <input type="text" ng-model="$ctrl.heslo"><br>
				Mejl: <input type="text" ng-model="$ctrl.mejl"><br>
				<button ng-click="$ctrl.ds.zmenUdajeUzivatela($ctrl.meno, $ctrl.heslo, $ctrl.mejl)">Ulož zmeny</button>
			`,

	controller: function($http, DataServis, $rootScope) {
		_this = this;
		_this.ds = DataServis;

		_this.query = function(co, id) {
			DataServis.query2(co, id).then(function(resp) {
				_this.vysledok = resp.data;
				_this.meno = _this.vysledok[0].u.properties.meno;
				_this.heslo = _this.vysledok[0].u.properties.heslo;
				_this.mejl = _this.vysledok[0].u.properties.mejl;
				_this.druhUdajov = co;
			});
		}

		_this.query('uzivatel', _this.idu);
	}
});