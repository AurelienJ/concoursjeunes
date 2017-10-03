import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { ICompetition } from './model/ICompetition';

@Component({
	selector: 'competition-parameters',
	template: `
<div class="box box-info">
	<div class="box-header with-border">
		<h4>Informations général</h4>
	</div>
	<div class="box-body">
		<div class="form-group">
			<label for="competitionName" class="col-sm-2 control-label">Nom</label>
			<div class="col-sm-10">
				<input type="text" 
					id="competitionName" name="competitionName"
					[(ngModel)]="competition.name"
					required maxlength="128"
					placeholder="Nom" class="form-control" /></div>
		</div>

		<div class="form-group">
			<label for="competitionPlace" class="col-sm-2 control-label">Lieu</label>
			<div class="col-sm-10">
				<input type="text"
					id="competitionPlace" name="competitionPlace"
					[(ngModel)]="competition.place"
					required maxlength="128"
					placeholder="Lieu" class="form-control"/></div>
		</div>

		<div class="form-group">
			<label class="col-sm-2 control-label">Date</label>
			<div class="col-sm-10">
			<p class="form-control-static">
				<a href="javascript:void(0)" (click)="drp.toggle()">
				<span *ngIf="competition.dates">Du {{competition.dates && competition.dates[0] | date:'dd/MM/yyyy'}} au {{competition.dates && competition.dates[1] | date:'dd/MM/yyyy'}}</span>
				<span *ngIf="!competition.dates">Séléctionner les dates de la compétition</span>
				</a>
				<bs-daterangepicker #drp [bsConfig]="{ containerClass: 'theme-dark-blue', locale: 'fr'}" [(bsValue)]="competition.dates" placement="bottom" style="display: block"></bs-daterangepicker>
			</p>
			</div>
		</div>
	</div>
</div>

<div class="box box-danger">
	<div class="box-header with-border">
		<h4>Compétition</h4>
	</div>
	<div class="box-body">
		<div class="form-group">
			<label class="col-md-3 col-lg-2 control-label">Réglement</label>
			<div class="col-md-9 col-lg-10">
			<p class="form-control-static">
			<a [routerLink]="['/rules', competition.idRule]" *ngIf="competition.rule">{{competition.rule.name}}</a> - 
			<a [routerLink]="['/rules']" [queryParams]="{forSelect : true}">Choisir...</a>
			</p>
			</div>
		</div>

		<div class="form-group">
			<label class="col-sm-2 control-label" for="competitionPhasesFinal">Phases Finale</label>
			<div class="col-sm-10">
				<div class="checkbox">
					<label><input type="checkbox" name="competitionPhasesFinal"
					[(ngModel)]="competition.duel"/></label>
				</div>
			</div>
		</div>

		<div class="form-group">
			<label for="competitionTargetsNumber" class="col-sm-2 control-label">Nombre de cibles</label>
			<div class="col-sm-10"><input type="number" placeholder="Nombre de cibles" id="competitionTargetsNumber" name="competitionTargetsNumber" class="form-control" [(ngModel)]="competition.targetsNumber"/></div>
		</div>

		<div class="form-group">
			<label for="competitionStartsNumber" class="col-sm-2 control-label">Nombre de départ</label>
			<div class="col-sm-10"><input type="number" placeholder="Nombre de départs" id="competitionStartsNumber" name="competitionStartsNumber" class="form-control" [(ngModel)]="competition.startsNumber"/></div>
		</div>
	</div>
</div>`
})

export class CompetitionParametersComponent implements OnInit {

	@Input("competition")
	public competition : ICompetition;

	constructor() { }

	ngOnInit() { }
}