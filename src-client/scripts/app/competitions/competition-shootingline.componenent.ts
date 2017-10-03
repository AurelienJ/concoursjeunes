import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

import { ICompetition } from './model/ICompetition';
import { IConcurrent } from "./model/IConcurrent";
import { Target } from "./model/Target";

@Component({
	selector: 'competition-shootingline',
	template: `
<div id="starts" class="box-group">
	<div class="panel box box-info">
		<div class="box-header with-border">
			<h4 class="box-title"><a href="#">Départ n°1</a></h4>
		</div>
		<div class="box-body">
			<div class="row">
				<div class="col-lg-4 col-md-6">
					<a class="btn btn-app" [routerLink]="['/concurrents']" [queryParams]="{forSelect : true}"><i aria-hidden="true" class="fa fa-plus-circle"></i> Ajouter</a>

					<br />

					<form novalidate> 
					<div class="btn-group btn-group-justified">
						<label class="btn btn-primary" [(ngModel)]="sortCriterion" btnRadio="name" name="sortBy"><i aria-hidden="true" class="fa fa-sort-alpha-asc"></i> Nom</label>
						<label class="btn btn-primary" [(ngModel)]="sortCriterion" btnRadio="target" name="sortBy"><i aria-hidden="true" class="fa fa-sort-numeric-asc"></i> Cible</label>
						<label class="btn btn-primary" [(ngModel)]="sortCriterion" btnRadio="club" name="sortBy"><i aria-hidden="true" class="fa fa-sort"></i> Club</label>
						<label class="btn btn-primary" [(ngModel)]="sortCriterion" btnRadio="score" name="sortBy"><i aria-hidden="true" class="fa fa-sort-amount-desc"></i> Score</label>
					</div>
					</form>

					<div class="input-group">
						<span class="input-group-addon"><i aria-hidden="true" class="fa fa-search"></i></span>
						<input class="form-control input-sm" placeholder="Recherche..." type="search" name="search">
					</div>
					
					<br />

					<div>
						<ul class="list-group" id="competitors">
							<li *ngFor="let competitor of competition.competitors" class="list-group-item">
								<competitor [competitor]="competitor"
									[expanded]="concurrentExpanedState.get(competitor)" (expandedChange)="expandedCompetitorChanged($event,competitor)"
									(onTargetPositionSelect)="onTargetPositionSelect($event)"
									></competitor>
							</li>
						</ul>
					</div>
				</div>
				<div class="col-lg-8 col-md-6">
					<a class="btn btn-app" href="#"><i aria-hidden="true" class="fa fa-forward"></i> Placement Automatique</a>
					<a class="btn btn-app" href="#"><i aria-hidden="true" class="fa fa-eraser"></i> Reinitialiser</a>

					<br />

					<div class="row" id="targets">
						<div class="col-lg-6 col-md-12" >
							<target *ngFor="let target of targets" [target]="target" [(competitorToPositionning)]="competitorToPositionning"></target>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>`,
	styles: [
		`:host #targets {
			overflow: auto;
			height: calc(100vh - 395px);
		}
		:host #competitors {
			overflow: auto;
			height: calc(100vh - 480px);
			margin-bottom: 0px;
		}    
		`
	]
})

export class CompetitionShootingLineComponent implements OnInit, OnChanges, DoCheck {
	@Input()
	public competition : ICompetition;

	public sortCriterion : string = "name";

	public concurrentExpanedState : Map<IConcurrent, boolean> = new Map<IConcurrent, boolean>();

	public targets : Target[];

	public competitorToPositionning : IConcurrent;

	constructor() {
	}

	ngOnInit() { }

	ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if(propName == "competition") {
				let competition : ICompetition = changes[propName].currentValue;

				this.generateShootingLine(competition);
			}
		}
	}

	ngDoCheck() {
		if(!this.targets || this.competition.targetsNumber != this.targets.length) {
			this.generateShootingLine(this.competition);
		}
	}

	public expandedCompetitorChanged(state : boolean, competitor : IConcurrent) {
		
		for (let key of Array.from(this.concurrentExpanedState.keys())) {
			if(key != competitor)
				this.concurrentExpanedState.set(key, false);
			else
				this.concurrentExpanedState.set(key, state);
		}

		if(!this.concurrentExpanedState.has(competitor))
			this.concurrentExpanedState.set(competitor, state);
	}

	public onTargetPositionSelect(competitor : IConcurrent) {
		this.competitorToPositionning = competitor;
	}

	private generateShootingLine(competition: ICompetition) {
		this.targets = [];
		for(let i = 1; i <= competition.targetsNumber; i++) {
			let target : Target = new Target(competition.competitors);
			target.numero = i;
			target.nbPositions = 4,
			
			this.targets.push(target);
		}
	}
}