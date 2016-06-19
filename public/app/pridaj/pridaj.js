app.component('pridaj', {
	bindings: {
		co: '@'
	},
	template: ` 
			<div ng-switch="$ctrl.co">
				<div ng-switch-when="uzivatel">
					{{$ctrl.co}}
				</div>
				<div ng-switch-when="pripomienka">
					{{$ctrl.co}}
				</div>
				<div ng-switch-when="projekt">
					<input type="text" ng-model="$ctrl.menoProjektu">
					<input type="text" ng-model="$ctrl.zadavatel">
					<button ng-click="$ctrl.ds.pridajProjekt($ctrl.menoProjektu, $ctrl.zadavatel)">[+] Pridaj projekt</button>
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
