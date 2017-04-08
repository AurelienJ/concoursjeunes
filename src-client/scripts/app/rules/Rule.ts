export class Rule {
	public id : string;
	public idCompetition : string;
	public name : string;
	public description : string; //$NON-NLS-1$
	public nbSerie : number = 2;
	public nbVoleeParSerie : number = 6;
	public nbFlecheParVolee : number = 3;
	public nbPointsParFleche : number = 10;
	public nbMembresEquipe : number = 4;
	public nbMembresRetenu : number = 3;
	public officialReglement : boolean = false;
	public idEntite : string;
	public idCategory : number;
	public reglementType : string = 'TARGET';
	public removable : boolean = true;
	public libelleEntite : string;
	public libelleCategorie : string;
	public departages : string;
}