app.component('pripomienky', {
	bindings: {
		pid: '@'
	},
	template: `
				<zobraz-udaje udaje="$ctrl.vysledok" druh="$ctrl.druhUdajov"></zobraz-udaje>
			`,

	controller: function($http, DataServis) {
		_this = this;
		_this.ds = DataServis;

		if(_this.pid) {
			_this.pripomienkyPreProjekt = function(pid) {
				DataServis.pripomienkyPreProjekt(_this.pid).then(function(resp) {
					_this.vysledok = resp.data;
					_this.druhUdajov = 'pripomienky';
				});
			}
			_this.pripomienkyPreProjekt(_this.pid);
		} else {
			_this.query = function(co) {
				DataServis.query(co).then(function(resp) {
					_this.vysledok = resp.data;
					_this.druhUdajov = co;
				});
			}

			_this.query('pripomienky');
		}
	}
});
