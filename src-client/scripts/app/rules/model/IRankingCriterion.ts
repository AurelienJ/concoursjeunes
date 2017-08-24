import { IDistanceAndFacesSet } from './IDistanceAndFacesSet';
import { IDiscriminantCriterionSet } from './IDiscriminantCriterionSet';

export interface IRankingCriterion {
	id : number;
    name : string;
    teamCriterion: boolean;
    idDistancesAndFacesSet: string;
    distancesAndFacesSet: IDistanceAndFacesSet;
    numordre: number;
    discriminantCriterionSets : IDiscriminantCriterionSet[];
}