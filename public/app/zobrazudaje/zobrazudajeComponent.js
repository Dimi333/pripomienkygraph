app.component('zobrazUdaje', {
	bindings: {
		udaje: '=',
		druh: '='
	},
	template: ` 
			<div ng-switch="$ctrl.druh">
				<div ng-switch-when="uzivatelia">
					<table>
					<tr>
						<th>Meno</th>
						<th>Počet pripomienok</th>
						<th>Počet projektov</th>
					</tr>
					<tr ng-repeat="u in $ctrl.udaje">
						<td>
							<a href="/uzivatel/{{u.u._id}}">{{u.u.properties.meno}}</a>
						</td>
						<td>
							{{u.pocetPripomienok}}
						</td>
						<td>
							{{u.pocetProjektov}}
						</td>
					</tr>
					</table>
				</div>

				<div ng-switch-when="pripomienky">
					<table>
					<tr>
						<th>Znenie</th>
						<th>Zadal</th>
					</tr>
					<tr ng-repeat="u in $ctrl.udaje">
						<td>
							<a href="/pripomienka/{{u.p._id}}">{{u.p.properties.znenie}}</a>
						</td>
						<td>
							<a href="/uzivatel/{{u.u._id}}">{{u.u.properties.meno}}</a>
						</td>
					</tr>
					</table>
				</div>

				<div ng-switch-when="projekty">
					<table>
					<tr>
						<th>Meno</th>
						<th>Počet pripomienok</th>
						<th>Zadávateľ projektu</th>
					</tr>
					<tr ng-repeat="u in $ctrl.udaje">
						<td>
							<a href="/projekt/{{u.n._id}}">{{u.n.properties.meno}}</a>
						</td>
						<td>
							{{u.pocetPripomienok}}
						</td>
						<td>
							<a href="/uzivatel/{{u.u._id}}">{{u.u.properties.meno}}</a>
						</td>
					</tr>
					</table>
				</div>
			</div>
			`,

	controller: function() {
		var _this = this;
	}
});