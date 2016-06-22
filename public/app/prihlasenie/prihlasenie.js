app.component('prihlasenie', {
	template: `
		<center>
			<h1>Pripomienkovač</h1>
			<form ng-submit="$ctrl.ds.prihlas($ctrl.prihlMeno, $ctrl.prihlHeslo)">
			<input type="text" ng-model="$ctrl.prihlMeno" placeholder="Meno"><br>
			<input type="password" ng-model="$ctrl.prihlHeslo" placeholder="Heslo"><br><br>
			<button type="submit">Prihlás</button>
			</form>
		</center>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;
	}
});
