app.component('projekt', {
	bindings: {
		pid: '@'
	},
	templateUrl: 'app/projekt/projekt.html',

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;
	}
});
