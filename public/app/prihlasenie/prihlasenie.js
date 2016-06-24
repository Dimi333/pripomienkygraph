app.component('prihlasenie', {
	template: `
		<center id="prihlFormular">
			<div>
				<p>Ak chcete niečo vykonať, musíte sa prihlásiť</p>
				<form ng-submit="$ctrl.ds.prihlas($ctrl.prihlMeno, $ctrl.prihlHeslo)">
				<input type="text" ng-model="$ctrl.prihlMeno" placeholder="Meno"><br>
				<input type="password" ng-model="$ctrl.prihlHeslo" placeholder="Heslo"><br><br>
				<button type="submit">Prihlás</button>
				</form>
			</div>
		</center>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;
	}
});
