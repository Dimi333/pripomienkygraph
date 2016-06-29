app.component('nadpis', {
	bindings: {
		pid: '<'
	},
	templateUrl: 'app/nadpis/nadpis.html',

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;

		_this.ds.query2('nadpis', _this.pid).then(function(resp) {
			_this.nadpis = resp.data[0].nadpis;
		});
	}
});
