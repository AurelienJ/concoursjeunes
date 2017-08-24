import { IDiscriminantCriterionSetElement } from './IDiscriminantCriterionSetElement';

export interface IDiscriminantCriterionSet {
	id : string;
	name: string;
	elements : IDiscriminantCriterionSetElement[];
}