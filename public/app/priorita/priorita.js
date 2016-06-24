app.component('priorita', {
	bindings: {
		stupen: '<',
		zapracovana: '<?'
	},
	template: `
				<span ng-class="$ctrl.trieda">{{$ctrl.prioritaSlovom}}</span>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;

		_this.prevedStupen = function(stupen) {
			switch(stupen) {
				case -1:
					_this.prioritaSlovom = 'Nízka';
					_this.trieda = 'nizka';
					break;
				case 0:
					_this.prioritaSlovom = 'Stredná';
					_this.trieda = 'stredna';
					break;
				case 1:
					_this.prioritaSlovom = 'Vysoká';
					_this.trieda = 'vysoka';
					break;
				case 2:
					_this.prioritaSlovom = 'ASAP';
					_this.trieda = 'vysoka2';
					break;
				default:
					_this.prioritaSlovom = 'Stredná';
					_this.trieda = 'stredna';
					break;
			}

			if(_this.zapracovana && stupen == 2) {
				_this.trieda = 'vysoka2zapracovana';
			}

			if(_this.zapracovana && stupen == 1) {
				_this.trieda = 'strednazapracovana';
			}
		}

		_this.$onChanges = function (changesObj) {
			if (changesObj.stupen) {
				_this.prevedStupen(changesObj.stupen.currentValue);
			}
		}
	}
});
