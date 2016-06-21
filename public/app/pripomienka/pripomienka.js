app.component('pripomienka', {
	bindings: {
		id: '@'
	},
	template: `
		<h2>Pripomienka</h2>
		<table>
		<tr>
			<td>ID</td>
			<td>{{$ctrl.id}}</td>
		</tr>
		<tr>
			<td>znenie</td>
			<td>{{$ctrl.znenie}}</td>
		</tr>
		<tr>
			<td>zadavatel</td>
			<td>{{$ctrl.zadavatel}}</td>
		</tr>
		<tr>
			<td>kedy</td>
			<td>{{$ctrl.kedy | date:'dd/MM/yyyy HH:mm:ss'}}</td>
		</tr>
		<tr>
			<td>priorita</td>
			<td>{{$ctrl.priorita}}</td>
		</tr>
		<tr>
			<td>Projekt</td>
			<td>{{$ctrl.patri}}</td>
		</tr>
		</table>
			`,

	controller: function($http, DataServis) {
		var _this = this;
		_this.ds = DataServis;

		_this.query = function(co, id) {
			DataServis.query2(co, id).then(function(resp) {
				_this.znenie = resp.data[0].p.properties.znenie;
				_this.zadavatel = resp.data[0].u.properties.meno;
				_this.kedy = resp.data[0].v.properties.kedy;
				_this.priorita = resp.data[0].p.properties.priorita;
				_this.patri = resp.data[0].r.properties.meno;
			});
		}

		_this.query('pripomienka', _this.id);
	}
});
