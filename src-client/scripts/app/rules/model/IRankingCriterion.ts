import { IDistanceAndFacesSet } from './IDistanceAndFacesSet';
import { IDiscriminantCriterionSet } from './IDiscriminantCriterionSet';

export interface IRankingCriterion {
	id : number;
    name : string;
    teamCriterion: boolean;
    idDistancesAndFacesSet: string;
    idTempDistancesAndFacesSet: string;
    distancesAndFacesSet: IDistanceAndFacesSet;
    ordre: number;
    discriminantCriterionSets : IDiscriminantCriterionSet[];
}