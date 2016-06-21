app.component('prihlasenie', {
	template: `
		<center>
			<h1>Pripomienkovač</h1>
			<input type="text" ng-model="$ctrl.prihlMeno" placeholder="Meno"><br>
			<input type="password" ng-model="$ctrl.prihlHeslo" placeholder="Heslo"><br>
			<button ng-click="$ctrl.ds.prihlas($ctrl.prihlMeno, $ctrl.prihlHeslo)">Prihlás</button>
		</center>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;
	}
});
