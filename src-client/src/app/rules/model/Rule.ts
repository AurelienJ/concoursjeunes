import { IRankingCriterion } from './IRankingCriterion';
import { IDistanceAndFacesSet } from './IDistanceAndFacesSet';
import { ITie } from './ITie';

export class Rule {
	public id : string;
	public idCompetition : string;
	public name : string;
	public description : string; //$NON-NLS-1$
	public nbSerie : number = 2;
	public nbVoleeParSerie : number = 10;
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
	public ties : ITie[];
	public rankingCriteria : IRankingCriterion[] = [];
	public distancesAndFaces : IDistanceAndFacesSet[] = [];
}