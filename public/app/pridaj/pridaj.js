app.component('pridaj', {
	bindings: {
		co: '@',
		pid: '@'
	},
	template: `
			<div ng-switch="$ctrl.co" class="pridavaciFormular">
				<div ng-switch-when="uzivatel">
					<h3>Pridanie užívateľa</h3>
					<input type="text" placeholder="Meno užívateľa" ng-model="$ctrl.menoUzivatela">
					<input type="text" placeholder="Heslo užívateľa" ng-model="$ctrl.hesloUzivatela">
					<button ng-click="$ctrl.ds.pridajUzivatela($ctrl.menoUzivatela, $ctrl.hesloUzivatela)">[+] Pridaj užívateľa</button>
				</div>
				<div ng-switch-when="pripomienka">
					<h3>Pridanie pripomienky</h3>
					<input type="text" placeholder="Znenie pripomienky" ng-model="$ctrl.zneniePripomienky">
					Priorita: <select ng-model="$ctrl.priorita">
						<option value="-1">nízka</option>
						<option value="0" selected>stredná</option>
						<option value="1">vysoká</option>
						<option value="2">ASAP</option>
					</select>
					<button ng-click="$ctrl.ds.pridajPripomienku($ctrl.zneniePripomienky, $ctrl.ds.id, $ctrl.pid, $ctrl.priorita)">[+] Pridaj pripomieku</button>
				</div>
				<div ng-switch-when="projekt">
					<h3>Pridanie projektu</h3>
					<input type="text" placeholder="Meno projektu" ng-model="$ctrl.menoProjektu">
					<button ng-click="$ctrl.ds.pridajProjekt($ctrl.menoProjektu, $ctrl.ds.id)">[+] Pridaj projekt</button>
				</div>
			</div>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;

		_this.priorita = 0;
	}
});
