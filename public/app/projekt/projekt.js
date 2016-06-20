app.component('projekt', {
	bindings: {
		pid: '@'
	},
	template: `
			id p: {{$ctrl.pid}}
			<br><br>
			<pridaj co="pripomienka" pid="{{$ctrl.pid}}"></pridaj>
			<br>
			Pripomienky pre tento projekt: <br><br>
			<pripomienky pid="{{$ctrl.pid}}"></pripomienky>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;
	}
});
