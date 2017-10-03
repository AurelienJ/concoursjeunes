export interface IScore {
	id : string;
	type : number;
	numOrdre : number;
	score: number;
}

export enum TypeScoreEnum {
	INTERMEDIAIRE = 0,
	FINAL = 1,
	PHASE_FINAL = 2,
	DEPARTAGE = 3,
	DEPARTAGE_PHASE_FINAL = 4
}