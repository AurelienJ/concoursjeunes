import { ICriterionElement } from './ICriterionElement';

/**
 * Represent a rules criterion
 */
export class Criterion {
	public id : string;
	public code : string;
	public idReglement : string;
	public libelle : string;
	public numordre : number;
	public idFederation : string;
	public criterionElements : ICriterionElement[] = [];
}