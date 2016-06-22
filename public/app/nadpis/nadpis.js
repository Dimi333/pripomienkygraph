app.component('nadpis', {
	bindings: {
		pid: '<'
	},
	template: `
			<h2>{{$ctrl.nadpis}}</h2>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;

		_this.ds.query2('nadpis', _this.pid).then(function(resp) {
			_this.nadpis = resp.data[0].nadpis;
		});
	}
});
