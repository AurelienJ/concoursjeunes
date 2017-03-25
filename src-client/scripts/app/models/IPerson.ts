export interface IPerson {
	type : string;
	id : string;
	name : string;
	firstName : string;
	idCivility : string;
	dateNaissance : Date;
	sexe: number;
	address : string;
	zipCode : string;
	city : string;
	countryCode : string;
	note : string;
	login : string;
	language : string;
	highlightExAequo : boolean;
	uncumuledInput : boolean;
	idEntity: string;
	numLicenceArcher : string;
	certificat : Date;
	handicape : boolean;
	dateModification : Date;
	coordinates : any[],
	categories : string[]
}