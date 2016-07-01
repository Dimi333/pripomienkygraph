app.component('pridaj', {
    bindings: {
            co: '@',
            pid: '@'
    },
    templateUrl: 'app/pridaj/pridaj.html',

    controller: function($http, $location, DataServis) {
            var _this = this;
            _this.ds = DataServis;

            _this.stupen = 0;
    }
});
