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
							<button ng-click="$ctrl.ds.chod('/uzivatel/' + u.u._id);">{{u.u.properties.meno}}</button>
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
						<th>Pridané</th>
					</tr>
					<tr ng-repeat="u in $ctrl.udaje">
						<td>
							<input type="checkbox" ng-show="{{u.v2.properties.kedy}}" checked disabled>
							<input type="checkbox" ng-hide="{{u.v2.properties.kedy}}" ng-click="$ctrl.ds.dokonciPripomienku(u.p._id);">
							<button ng-click="$ctrl.ds.chod('/pripomienka/'+ u.p._id);">{{u.p.properties.znenie}}</button>
						</td>
						<td>
							<button ng-click="$ctrl.ds.chod('/uzivatel/' + u.u._id);">{{u.u.properties.meno}}</button>
						</td>
						<td>
							{{u.v.properties.kedy | date:'dd/MM/yyyy'}}
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
							<button ng-click="$ctrl.ds.chod('/projekt/'+ u.n._id);">{{u.n.properties.meno}}</button>
						</td>
						<td>
							{{u.pocetPripomienok}}
						</td>
						<td>
							<button ng-click="$ctrl.ds.chod('/uzivatel/' + u.u._id);">{{u.u.properties.meno}}</button>
						</td>
					</tr>
					</table>
				</div>
			</div>
			`,

	controller: function(DataServis) {
		var _this = this;
		_this.ds = DataServis;
	}
});
