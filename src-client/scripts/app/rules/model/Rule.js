System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rule;
    return {
        setters: [],
        execute: function () {
            Rule = (function () {
                function Rule() {
                    this.nbSerie = 2;
                    this.nbVoleeParSerie = 10;
                    this.nbFlecheParVolee = 3;
                    this.nbPointsParFleche = 10;
                    this.nbMembresEquipe = 4;
                    this.nbMembresRetenu = 3;
                    this.officialReglement = false;
                    this.reglementType = 'TARGET';
                    this.removable = true;
                    this.rankingCriteria = [];
                    this.distancesAndFaces = [];
                }
                return Rule;
            }());
            exports_1("Rule", Rule);
        }
    };
});

//# sourceMappingURL=Rule.js.map
