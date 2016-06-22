app.component('nastaveniePriority', {
	bindings: {
		stupen: '=?stupen'
	},
	template: `
			<select ng-model="$ctrl.stupen">
				<option value="-1">nízka</option>
				<option value="0" selected>stredná</option>
				<option value="1">vysoká</option>
				<option value="2">ASAP</option>
			</select>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.stupen = 0;
	}
});
