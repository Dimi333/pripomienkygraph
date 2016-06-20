app.component('prihlasenie', {
	template: `
			<input type="text" ng-model="$ctrl.prihlMeno" placeholder="Meno"><br>
			<input type="password" ng-model="$ctrl.prihlHeslo" placeholder="Heslo"><br>
			<button ng-click="$ctrl.ds.prihlas($ctrl.prihlMeno, $ctrl.prihlHeslo)">Prihlás</button>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;
	}
});
