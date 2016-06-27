app.component('komentare', {
	bindings: {
		id: '<'
	},
	template: `
				<h3>Komentáre</h3>
				{{$ctrl.komentare}}
				<pridaj co="komentar" pid="{{$ctrl.id}}"></pridaj>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;

		_this.nacitajKomentare = function(id) {
			_this.ds.nacitajKomentare(id).then(function(resp) {
				if(!resp.data) {
					_this.komentare = '-';
				} else {
					_this.komentare = 'komentare';
				}
			});
		}
	}
});
