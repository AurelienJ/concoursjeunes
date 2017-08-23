import {IAnchor} from './IAnchor';

export interface IFace {
    id: string;
    name: string;
    horizontalRatio: number;
    verticalRatio: number;
    nbArcher: number;
    numordre: number;
    ancrages: IAnchor[];
    targetFaceImage: string;
}