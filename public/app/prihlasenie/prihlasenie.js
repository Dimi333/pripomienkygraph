app.component('prihlasenie', {
	templateUrl: 'app/prihlasenie/prihlasenie.html',

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;
	}
});
