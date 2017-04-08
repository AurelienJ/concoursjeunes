import { Criterion } from './Criterion';

/**
 * Represent an element of a rule criterion
 */
export interface ICriterionElement {
	id : string;
	code: string;
	libelle : string;
	numordre : number;
	//criterion : Criterion
}