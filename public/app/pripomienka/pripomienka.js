app.component('pripomienka', {
	bindings: {
		id: '@'
	},
	template: `
		<h2>Pripomienka</h2>
		<table class="pripomienka">
		<tr>
			<th></th>
			<th></th>
		</tr>
		<tr>
			<td>ID</td>
			<td>{{$ctrl.id}}</td>
		</tr>
		<tr>
			<td>Znenie</td>
			<td><textarea ng-model="$ctrl.znenie"></textarea></td>
		</tr>
		<tr>
			<td>Zadávateľ</td>
			<td>{{$ctrl.zadavatel}}</td>
		</tr>
		<tr>
			<td>Zapracoval</td>
			<td>{{$ctrl.zapracoval | akNieje: '-'}}</td>
		</tr>
		<tr>
			<td>Trvanie</td>
			<td><input type="text" ng-model="$ctrl.trvanie"> min</td>
		</tr>
		<tr>
			<td>Čas zapracovania</td>
			<td>{{$ctrl.zapracovane | date:'dd/MM/yyyy HH:mm' | akNieje: '-'}}</td>
		</tr>
		<tr>
			<td>Čas zadania</td>
			<td>{{$ctrl.kedy | date:'dd/MM/yyyy HH:mm'}}</td>
		</tr>
		<tr>
			<td>Priorita</td>
			<td><priorita stupen="$ctrl.priorita" zapracovana="$ctrl.zapracoval"></priorita> <span ng-show="$ctrl.ds.prihlaseny">zmeniť <nastavenie-priority stupen="$ctrl.priorita"></nastavenie-priority></span></td>
		</tr>
		<tr>
			<td>Projekt</td>
			<td>{{$ctrl.patri}}</td>
		</tr>
		</table>
		<br>
		<button ng-show="$ctrl.ds.prihlaseny" ng-click="$ctrl.ds.zmenPripomienku($ctrl.id, $ctrl.znenie, $ctrl.priorita, $ctrl.trvanie);">Zmeň pripomienku</button>
			`,

	controller: function($http, DataServis) {
		var _this = this;
		_this.ds = DataServis;

		_this.query = function(co, id) {
			DataServis.query2(co, id).then(function(resp) {
				_this.znenie = resp.data[0].p.properties.znenie;
				_this.zadavatel = resp.data[0].u.properties.meno;
				_this.kedy = resp.data[0].v.properties.kedy;
				_this.priorita = parseInt(resp.data[0].p.properties.priorita);
				if(resp.data[0].p.properties.cas) {
					_this.trvanie = parseInt(resp.data[0].p.properties.cas);
				} else {
					_this.trvanie = 0;
				}
				_this.patri = resp.data[0].r.properties.meno;

				if(resp.data[0].u2)
					_this.zapracoval = resp.data[0].u2.properties.meno;

				if(resp.data[0].u2)
					_this.zapracovane = resp.data[0].v2.properties.kedy;
			});
		}

		_this.query('pripomienka', _this.id);
	}
});
