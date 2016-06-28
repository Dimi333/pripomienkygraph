app.component('komentare', {
	bindings: {
		id: '<'
	},
	template: `
				<h3>Komentáre</h3>
				<zobraz-udaje udaje="$ctrl.komentare" druh="'komentare'"></zobraz-udaje><br>
				<pridaj co="komentar" pid="{{$ctrl.id}}"></pridaj>
			`,

	controller: function($rootScope, $http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;

		_this.nacitajKomentare = function(id) {
			_this.ds.nacitajKomentare(id).then(function(resp) {
				if(!resp.data) {
					_this.komentare = '-';
				} else {
					_this.komentare = resp.data;
				}
			});
		}

		$rootScope.$on('pridanyKomentar', function(e, d) {
			_this.nacitajKomentare(_this.id);
		});

		_this.nacitajKomentare(_this.id);
	}
});
