app.component('pridaj', {
	bindings: {
		co: '@',
		pid: '@'
	},
	template: `
			<div ng-switch="$ctrl.co">
				<div ng-switch-when="uzivatel">
					<input type="text" placeholder="Meno užívateľa" ng-model="$ctrl.menoUzivatela">
					<input type="text" placeholder="Heslo užívateľa" ng-model="$ctrl.hesloUzivatela">
					<button ng-click="$ctrl.ds.pridajUzivatela($ctrl.menoUzivatela, $ctrl.hesloUzivatela)">[+] Pridaj užívateľa</button>
				</div>
				<div ng-switch-when="pripomienka">
					<input type="text" placeholder="Znenie pripomienky" ng-model="$ctrl.zneniePripomienky">
					<button ng-click="$ctrl.ds.pridajPripomienku($ctrl.zneniePripomienky, $ctrl.ds.id, $ctrl.pid)">[+] Pridaj pripomieku</button>
				</div>
				<div ng-switch-when="projekt">
					<input type="text" placeholder="Meno projektu" ng-model="$ctrl.menoProjektu">
					<button ng-click="$ctrl.ds.pridajProjekt($ctrl.menoProjektu, $ctrl.ds.id)">[+] Pridaj projekt</button>
				</div>
			</div>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;

		_this.menoProjektu;
		_this.zadavatel;
	}
});
