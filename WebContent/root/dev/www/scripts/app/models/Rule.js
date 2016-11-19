"use strict";
var Rule = (function () {
    function Rule() {
        this.nbSerie = 2;
        this.nbVoleeParSerie = 6;
        this.nbFlecheParVolee = 3;
        this.nbPointsParFleche = 10;
        this.nbMembresEquipe = 4;
        this.nbMembresRetenu = 3;
        this.officialReglement = false;
        this.reglementType = 'TARGET';
        this.removable = true;
    }
    return Rule;
}());
exports.Rule = Rule;

//# sourceMappingURL=Rule.js.map
