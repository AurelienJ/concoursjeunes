import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';

import { EntitesService } from "../entites/entites.service";

import { IConcurrent } from "./model/IConcurrent";
import { IEntite } from "../entites/ientite";
import { IScore, TypeScoreEnum } from "./model/IScore";

@Component({
	selector: 'competitor',
	template: `<div>
	<div class="competitor-target">
		<h4>
		<button type="button" class="btn btn-link" (click)="selectTargetPosition()"
			tooltip="Cliquer sur la position sur laquelle placer l'archer"
			placement="top" triggers="click:blur" container="body">
			{{competitor.target || '#'}}{{competitor.position | numToLetter}}</button>
		</h4>
	</div>
	<div class="competitor-general">
		<div class="competitor-header">
			<strong><i aria-hidden="true" class="fa" [ngClass]="{'fa-mars': competitor.archer.sexe == 0, 'fa-venus': competitor.archer.sexe == 1}"></i> 
			{{competitor.archer.name}} {{competitor.archer.firstName}}</strong>
			<span class="badge">SHCL</span>
			<span class="badge pull-right bg-green">{{getTotal(0)}}</span>
			<br />
			{{club?.nom}} <span class="badge pull-right bg-aqua">18m / 40cm</span>
		</div>

		<div *ngIf="expanded">
			<form class="form-horizontal" #concurrentForm="ngForm">
				<h4>Phase qualificative</h4>
				<div class="form-group">
					<label class="col-sm-4 control-label">Score:</label>
					<div class="col-sm-4">
						<input type="number" class="form-control" name="score1"
							[ngModel]="getScore(0, 0)" (ngModelChange)="setScore(0, 0, $event)"/>
					</div>
					<div class="col-sm-4">
						<input type="number" class="form-control" name="score2"
							[ngModel]="getScore(0, 1)" (ngModelChange)="setScore(0, 1, $event)"/>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-4 control-label">Départages:</label>
					<div class="col-sm-4">
						<input type="number" class="form-control" name="tie1"/>
					</div>
					<div class="col-sm-4">
						<input type="number" class="form-control" name="tie2"/>
					</div>
				</div>
				<h4>Phases finales</h4>
				<div class="form-group">
					<label for="f32" class="col-sm-1 control-label">1/32:</label><div class="col-sm-3"><input type="number" class="form-control" name="f32" /></div>
					<label for="f16" class="col-sm-1 control-label">1/16:</label><div class="col-sm-3"><input type="number" class="form-control" name="f16"/></div>
					<label for="f8" class="col-sm-1 control-label">1/8:</label><div class="col-sm-3"><input type="number" class="form-control" name="f8" /></div>
				</div>
				<div class="form-group">
					<label for="f4" class="col-sm-2 control-label">1/4:</label><div class="col-sm-4"><input type="number" class="form-control" name="f4" /></div>
					<label for="f2" class="col-sm-2 control-label">1/2:</label><div class="col-sm-4"><input type="number" class="form-control" name="f2" /></div>
				</div>
				<div class="form-group">
					<label for="f1" class="col-sm-offset-3 col-sm-2 control-label">Finale:</label><div class="col-sm-4"><input type="number" class="form-control" name="f1" /></div>
				</div>
			</form>
		</div>
	</div>
	<div class="competitor-collapse">
		<button type="button" class="btn btn-link no-border" (click)="toggle()"><i class="fa" [ngClass]="{'fa-minus-square-o': expanded, 'fa-plus-square-o': !expanded}" aria-hidden="true"></i></button>
	</div>
</div>`,
	styles: [
		`
		:host .competitor-target {
			position: absolute;
			top: 0px;
			left: 0px;
		}

		:host .competitor-general {
			display: inline-block;
			width: calc(100% - 50px);
			margin-left: 25px;
		}

		:host .competitor-collapse {
			display: inline-block;
			position: absolute;
			top: 0px;
			right: 0px;
		}
		`
	]
})

export class CompetitorComponent implements OnInit, OnChanges {
	@Input()
	public competitor : IConcurrent;

	@Input()
	public expanded : boolean = false;

	@Output()
	public expandedChange : EventEmitter<boolean> = new EventEmitter<boolean>();

	@Output()
	public onTargetPositionSelect : EventEmitter<IConcurrent> = new EventEmitter<IConcurrent>();

	public club : IEntite;

	constructor(private entiteService : EntitesService) { }

	ngOnInit() { }

	ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if(propName == "competitor") {
				this.entiteService.getEntity(this.competitor.archer.idEntity).then(name => this.club = name);
			}
		}
	}

	public toggle() {
		this.expanded = !this.expanded;
		this.expandedChange.emit(this.expanded);
	}

	public getScore(type : TypeScoreEnum, indice : number) : number {
		if(!this.competitor.scores)
			this.competitor.scores = [];
		let score = this.competitor.scores.find(s => s.type == type && s.numOrdre == indice);
		if(score)
			return score.score;

		return null;
	}

	public setScore(type : TypeScoreEnum, indice : number, value : number) {
		if(!this.competitor.scores)
			this.competitor.scores = [];
		let score = this.competitor.scores.find(s => s.type == type && s.numOrdre == indice);
		if(!score) {
			score = <IScore>{ type: type, numOrdre: indice, score: value};
			this.competitor.scores.push(score);
		} else
			score.score = value;
	}

	public getTotal(type : TypeScoreEnum) : number {
		if(!this.competitor.scores)
			this.competitor.scores = [];
		let total = this.competitor.scores.filter(s => s.type == type).map(s => s.score).reduce((p1, p2) => p1 + p2, 0);

		return total;
	}

	public selectTargetPosition() {
		this.onTargetPositionSelect.emit(this.competitor);
	}
}