app.component('zobrazUdaje', {
	bindings: {
		udaje: '<',
		druh: '<'
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
						<th>Priorita</th>
						<th>Zadal</th>
						<th>Trvanie<br><small>(min)</small></th>
						<th>Zapracoval</th>
						<th>Zapracované</th>
						<th>Pridané</th>
					</tr>
					<tr ng-repeat="u in $ctrl.udaje" ng-class="u.casZapracovania? 'zapracovanaPripomienka': ''">
						<td>
							<input type="checkbox" ng-if="u.casZapracovania" checked disabled>
							<input type="checkbox" ng-if="!u.casZapracovania && $ctrl.ds.prihlaseny == false" disabled>
							<input type="checkbox" ng-if="!u.casZapracovania && $ctrl.ds.prihlaseny == true" ng-click="$ctrl.ds.dokonciPripomienku(u.p._id);">
							<button ng-click="$ctrl.ds.chod('/pripomienka/'+ u.p._id);"><span ng-hide="{{u.casZapracovania}}">{{u.p.properties.znenie}}</span><s ng-show="{{u.casZapracovania}}">{{u.p.properties.znenie}}</s></button>
						</td>
						<td>
							<priorita stupen="u.p.properties.priorita" zapracovana="u.casZapracovania"></priorita>
						</td>
						<td>
							<small>{{u.zadavatel}}</button></small>
						</td>
						<td>
							<small ng-if="u.p.properties.cas">{{u.p.properties.cas}}</small>
							<small ng-if="!u.p.properties.cas">-</small>
						</td>
						<td>
							<small ng-if="u.zapracoval > 0">{{u.zapracoval}}</small>
							<small ng-if="u.zapracoval == 0 || !u.zapracoval">-</small>
						</td>
						<td>
							<small>{{u.casZapracovania | date:'dd/MM/yyyy HH:mm' | akNieje: '-'}}</small>
						</td>
						<td>
							<small>{{u.casZadania | date:'dd/MM/yyyy HH:mm'}}</small>
						</td>
					</tr>
					</table>
				</div>

				<div ng-switch-when="projekty">
					<table>
					<tr>
						<th>Meno</th>
						<th>Počet pripomienok</th>
						<th>Nesplnených</th>
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
							{{u.nesplnenePripomienky}}
						</td>
						<td>
							<small>{{u.u.properties.meno}}</small>
						</td>
					</tr>
					</table>
				</div>

				<div ng-switch-when="komentare">
					<table>
					<tr>
						<th>Znenie</th>
						<th>Kedy</th>
						<th>Komentoval</th>
					</tr>
					<tr ng-repeat="u in $ctrl.udaje">
						<td>
							&mdash; {{u.znenie}}
						</td>
						<td>
							{{u.kedy | date:'dd/MM/yyyy HH:mm'}}
						</td>
						<td>
							{{u.komentator}}
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
