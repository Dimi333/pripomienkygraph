app.component('projekt', {
	bindings: {
		pid: '@'
	},
	template: `
			<pridaj co="pripomienka" pid="{{$ctrl.pid}}"></pridaj>
			<br>
			<pripomienky pid="{{$ctrl.pid}}"></pripomienky>
			`,

	controller: function($http, $location, DataServis) {
		var _this = this;
		_this.ds = DataServis;
	}
});
