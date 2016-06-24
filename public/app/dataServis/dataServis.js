app.service('DataServis', function($rootScope, $http, $location) {
	var _this = this;

	_this.prihlaseny = false;
	_this.id;
	_this.meno;

	_this.query = function(co) {
		return $http.get('/get/' + co);
	}

	_this.query2 = function(co, id) {
		return $http.post('/get/' + co, {id: id});
	}

	_this.pridajProjekt = function(meno, zadavatelID) {
		$http.post('/put/projekt', {meno: meno, zadavatelID: zadavatelID}).then(function(resp) {
			$rootScope.$emit('pridanyProjekt');
		})
	}

	_this.pridajPripomienku = function(znenie, zadavatelID, projektID, priorita) {
		$http.post('/put/pripomienka', JSON.stringify({znenie: znenie, zadavatelID: zadavatelID, projektID: projektID, priorita: priorita})).then(function(resp) {
			$rootScope.$emit('pridanaPripomienka');
		})
	}

	_this.pridajUzivatela = function(meno, heslo) {
		$http.post('/put/uzivatel', {meno: meno, heslo: heslo}).then(function(resp) {
			$rootScope.$emit('pridanyUzivatel');
		})
	}
	_this.prihlas = function(meno, heslo) {
		$http.post('/put/prihlas', {meno: meno, heslo: heslo}).then(function(resp) {
			if(resp.data[0].u.properties.meno) {
				_this.id = resp.data[0].u._id;
				_this.meno = meno;
				_this.prihlaseny = true;
			}
		})
	}
	_this.pripomienkyPreProjekt = function(pid) {
		return $http.post('/put/pripomienkyPreProjekt', {pid: pid});
	}

	_this.chod = function(kam) {
		$location.path(kam)
	}

	_this.zmenPripomienku = function(id, znenie, priorita, trvanie) {
		$http.post('/put/zmenPripomienku', {id: id, znenie: znenie, priorita: priorita, trvanie: trvanie}).then(function(resp) {
			alert('Pripomienka zmenená');
		})
	}

	_this.dokonciPripomienku = function(id) {
		if(_this.prihlaseny == true) {
			var stravenyCas = prompt('Koľko minút to trvalo?', 0);
			$http.post('/put/dokonciPripomienku', {id: id, dokoncil: _this.id, cas: stravenyCas}).then(function(resp) {
				$rootScope.$emit('dokoncenaPripomienka');
			})
		} else {
			_this.zobrazVyzvuNaPrihlasenie = true;
			return false;
		}


	}

	_this.zmenUdajeUzivatela = function(meno, heslo, mejl) {
		$http.post('/put/zmenUdajeUzivatela', {meno: meno, heslo: heslo, mejl: mejl, id: _this.id}).then(function(resp) {
			alert('Zmenené údaje užívateľa');
		})
	}
});
