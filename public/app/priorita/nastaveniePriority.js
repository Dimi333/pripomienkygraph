app.component('nastaveniePriority', {
	bindings: {
		stupen: '=?stupen'
	},
	templateUrl: 'app/priorita/nastaveniePriority.html',

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.stupen = 0;
	}
});
