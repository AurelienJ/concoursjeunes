import { IFaceDistanceAndFaces } from './IFaceDistanceAndFaces';

export interface IDistanceAndFaces {
    id : number;
    distance: number;
    serie: number;
    defaultFace: string;
    facesDistanceAndFaces: IFaceDistanceAndFaces[];
}