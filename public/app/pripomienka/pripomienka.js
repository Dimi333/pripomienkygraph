app.component('pripomienka', {
	bindings: {
		id: '@'
	},
	templateUrl: 'app/pripomienka/pripomienka.html',

	controller: function($http, DataServis) {
		var _this = this;
		_this.ds = DataServis;

		_this.query = function(co, id) {
			DataServis.query2(co, id).then(function(resp) {
				_this.znenie = resp.data[0].p.properties.znenie;
				_this.zadavatel = resp.data[0].u.properties.meno;
				_this.kedy = resp.data[0].v.properties.kedy;
				_this.priorita = parseInt(resp.data[0].p.properties.priorita);
				if(resp.data[0].p.properties.cas) {
					_this.trvanie = parseInt(resp.data[0].p.properties.cas);
				} else {
					_this.trvanie = 0;
				}
				_this.patri = resp.data[0].r.properties.meno;

				if(resp.data[0].u2)
					_this.zapracoval = resp.data[0].u2.properties.meno;

				if(resp.data[0].u2)
					_this.zapracovane = resp.data[0].v2.properties.kedy;
			});
		}

		_this.query('pripomienka', _this.id);
	}
});
