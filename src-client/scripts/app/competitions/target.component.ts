import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { ITarget } from "./model/ITarget";
import { IConcurrent } from './model/IConcurrent';

import * as _ from "lodash";


@Component({
	selector: 'target',
	template: `<div class="box box-solid box-primary target">
	<div class="box-header">
		<h3 class="box-title">Cible n°{{target.numero}}</h3>
		<div class="box-tools pull-right">
			<span class="label label-success">{{distances}}</span>
		  </div>
	</div>
	<div class="box-body">
		<ul class="list-group" id="targets-positions">
			<li *ngFor="let competitor of target.competitors; index as i;" class="list-group-item">
				<div class="target-position">
				<button type="button" class="btn btn-link" (click)="affectCompetitorToPositionning(i)">{{i | numToLetter}}</button>
				</div>
				<div class="target-competitor" >
					<div *ngIf="competitor">
						<strong ><i aria-hidden="true" class="fa fa-mars" [ngClass]="{'fa-mars': competitor.archer.sexe == 0, 'fa-venus': competitor.archer.sexe == 1}"></i> 
					### {{competitor.archer.name}} {{competitor.archer.firstName}}</strong>
					<span class="badge">SHCL</span></div>
				</div>
			</li>
		</ul>
	</div>
</div>`,
	styles: [
		`:host .target-position {
			display: inline-block;
		}

		:host .target-competitor {
			display: inline-block;
		}
		
		:host .target .box-body {
			padding: 0px;
		}
		
		:host .target .list-group {
			margin-bottom: 0px;
		}`
	]
})

export class TargetComponent implements OnInit, OnDestroy {
	@Input()
	public target : ITarget;

	@Input()
	public competitorToPositionning : IConcurrent;

	public get distances() {
		return _.uniq(this.target.distances).map(d => d + "m").join(" / ");
	}

	constructor() {
		
	}

	ngOnInit() {
		
	}

	ngOnDestroy() {
	}

	public affectCompetitorToPositionning(i : number) : void {
		this.target.competitors[i] = this.competitorToPositionning;
		this.competitorToPositionning.target = this.target.numero;
		this.competitorToPositionning.position = i;
	}
}