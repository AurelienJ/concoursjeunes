import { IConcurrent } from "./IConcurrent";

export class Target {
	constructor(private startCompetitors : IConcurrent[]) {
	}

	public numero: number;
	public distances: number[];

	private _nbPositions : number;
	public get nbPositions(): number {
		return this._nbPositions;
	}

	public set nbPositions(value : number) {
		this._nbPositions = value;
		this.targetCompetitors = new Array(value);
	}

	private targetCompetitors : IConcurrent[];

	public getCompetitor(position : number) : IConcurrent {
		if(this.startCompetitors)
			return this.startCompetitors.find(c => c.target == this.numero && c.position == position);
		return null;
	}

	public get competitors() : IConcurrent[] {
		for(let i = 0; i < this.nbPositions; i++) {
			this.targetCompetitors[i] = this.getCompetitor(i);
		}

		return this.targetCompetitors;
	}
}