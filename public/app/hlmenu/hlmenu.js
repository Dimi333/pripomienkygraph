app.component('hlmenu', {
	template: ` <div ng-show="$ctrl.ds.prihlaseny" class="hlmenu">
					<button ng-click="$ctrl.chod('projekty')">Projekty</button>
					<button ng-click="$ctrl.chod('uzivatelia')">Požívatelia</button>
					<!--button ng-click="$ctrl.chod('pripomienky')">Pripomienky</button-->
				<br><br>
				</div>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;
		_this.vysledok;
		_this.druhUdajov;

		_this.chod = function(kam) {
			$location.path(kam)
		}
	}
});
