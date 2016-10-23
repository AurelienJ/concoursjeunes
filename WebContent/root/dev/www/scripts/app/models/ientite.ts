/**
 * Représente une entité (Féd&ration / club)
 */
export interface IEntite {
    /**
     * Identifiant unique de l'entité 
     */
    id : string;

    /**
     * Nom de l'entité
     */
    nom : string;

    /**
     * Identifiant externe de l'entité
     */
    reference : string;

    /**
     * Adresse
     */
    adresse : string;

    codePostal : string;

    ville : string;

    pays : string;

    note : string;

    logo : string;

    type : number;

    removable : boolean;

    idEntiteParent : string;

    entiteParent : IEntite;
}