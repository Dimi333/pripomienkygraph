app.component('projekt', {
	bindings: {
		pid: '@'
	},
	template: `
			<pridaj co="pripomienka" pid="{{$ctrl.pid}}"></pridaj>
			<br>
			<h2>Pripomienky pre tento projekt</h2>
			
			<pripomienky pid="{{$ctrl.pid}}"></pripomienky>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;
	}
});
