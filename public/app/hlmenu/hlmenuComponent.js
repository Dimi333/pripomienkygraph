app.component('hlmenu', {
	template: ` 
				<button ng-click="$ctrl.chod('uzivatelia')">užívatelia</button>
				<button ng-click="$ctrl.chod('pripomienky')">pripomienky</button>
				<button ng-click="$ctrl.chod('projekty')">projekty</button>
				|
				<button ng-click="$ctrl.chod('pridajProjekt')">[+] projekt</button>
				<button ng-click="$ctrl.chod('pridajPripomienku')">[+] pripomienka</button>
				<button ng-click="$ctrl.chod('pridajUzivatela')">[+] užívateľ</button>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.DataServis = DataServis;
		_this.vysledok;
		_this.druhUdajov;

		_this.chod = function(kam) {
			$location.path(kam)
		}
	}
});
