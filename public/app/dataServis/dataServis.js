app.service('DataServis', function($http, $location) {
	var _this = this;

	_this.prihlaseny = false;
	_this.id;
	_this.meno;

	_this.query = function(co) {
		return $http.get('http://192.168.1.76:3000/get/' + co);
	}

	_this.pridajProjekt = function(meno, zadavatelID) {
		$http.post('http://192.168.1.76:3000/put/projekt', {meno: meno, zadavatelID: zadavatelID}).then(function(resp) {
			console.log(resp.data);
		})
	}

	_this.pridajPripomienku = function(znenie, zadavatelID, projektID) {
		$http.post('http://192.168.1.76:3000/put/pripomienka', JSON.stringify({znenie: znenie, zadavatelID: zadavatelID, projektID: projektID})).then(function(resp) {
			console.log(resp.data);
		})
	}

	_this.pridajUzivatela = function(meno, heslo) {
		$http.post('http://192.168.1.76:3000/put/uzivatel', {meno: meno, heslo: heslo}).then(function(resp) {
			console.log(resp.data);
		})
	}
	_this.prihlas = function(meno, heslo) {
		$http.post('http://192.168.1.76:3000/put/prihlas', {meno: meno, heslo: heslo}).then(function(resp) {
			if(resp.data[0].u.properties.meno) {
				_this.id = resp.data[0].u._id;
				_this.meno = meno;
				_this.prihlaseny = true;
				$location.path('/');
			}
		})
	}
	_this.pripomienkyPreProjekt = function(pid) {
		return $http.post('http://192.168.1.76:3000/put/pripomienkyPreProjekt', {pid: pid});
	}

	_this.chod = function(kam) {
		$location.path(kam)
	}

	_this.dokonciPripomienku = function(id) {
		$http.post('http://192.168.1.76:3000/put/dokonciPripomienku', {id: id, dokoncil: _this.id}).then(function(resp) {
			console.log(resp.data);
		})
	}
});
