app.component('hlmenu', {
	templateUrl: 'app/hlmenu/hlmenu.html',

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;
		_this.vysledok;
		_this.druhUdajov;

		_this.chod = function(kam) {
			$location.path(kam);
		};
	}
});