import { IPerson } from "../../persons/IPerson";
import { IScore } from "./IScore";

export class IConcurrent {
	idArcher : string;
	archer : IPerson;

	idRankingCriterion : string;

	start: number;
	target: number;
	position: number;

	presence: boolean;
	surclassement: boolean;

	scores : IScore[];
}