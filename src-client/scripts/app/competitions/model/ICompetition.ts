import { Rule } from "../../rules/model/Rule";
import { IEntite } from "../../entites/ientite";

import { IConcurrent } from "./IConcurrent";

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
    targetsNumber: number;
    startsNumber: number;

    competitors : IConcurrent[];
}