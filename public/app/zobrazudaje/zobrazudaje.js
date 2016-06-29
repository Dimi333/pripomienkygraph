app.component('zobrazUdaje', {
	bindings: {
		udaje: '<',
		druh: '<'
	},
	templateUrl: 'app/zobrazudaje/zobrazUdaje.html',

	controller: function(DataServis) {
		var _this = this;
		_this.ds = DataServis;
	}
});
