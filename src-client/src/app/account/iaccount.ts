import { IPerson } from "../persons/IPerson";

export interface IAccount extends IPerson {
    login : string;
    password : string;
    newPassword : string;
    authToken : string;
    keepAuth : boolean;
}