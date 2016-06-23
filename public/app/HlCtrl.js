app.controller('HlCtrl', ['DataServis', function(DataServis) {
	_this = this;

	_this.ds = DataServis;
	console.log(_this.ds.prihlaseny);
}]);
