app.service('DataServis', function($http) {
	var _this = this;

	_this.query = function(co) {
		return $http.get('http://localhost:3000/get/' + co);
	}

	_this.pridajProjekt = function(meno, zadavatelID) {
		$http.post('http://localhost:3000/put/projekt', {meno: meno, zadavatelID: zadavatelID}).then(function(resp) {
			console.log(resp.data);
		})
	}
});