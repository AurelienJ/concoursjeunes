import { ICriterionElement } from './ICriterionElement';

/**
 * Represent a rules criterion
 */
export class Criterion {
	private _criterionElements : ICriterionElement[];

	public id : string;
	public code : string;
	public idReglement : string;
	public libelle : string;
	public numordre : number;
	
	public set criterionElements(elements : ICriterionElement[]) {
		elements.forEach(e => e.criterion = this);
		this._criterionElements = elements;
	}

	public get criterionElements() {
		return this._criterionElements
	}
}