import { Rule } from "../rules/model/Rule";
import { IEntite } from "../entites/ientite";

export interface ICompetitionDescription {
}

export interface ICompetition {
    id : string;
    name : string;
    idRule : string;
    rule: Rule;
    idOrganisator : string;
    organisator: IEntite;
    place: string;
    dates: Date[];
    duel : boolean;
    idNiveauCompetition: string;
    targetsnumber: number;
    startsnumber: number;
}