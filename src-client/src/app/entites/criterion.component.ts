import { Component, OnInit, Input } from '@angular/core';

import { Criterion } from './Criterion';
import { ICriterionElement } from './ICriterionElement';

@Component({
	selector: 'criterion',
	template: `<div>
		<h3>Détail d'un critère</h3>
		<div class="form-group">
			<label for="libelleCriterion" class="col-sm-2 control-label">Libelle</label>
			<div class="col-sm-10"><input placeholder="Libelle" id="libelleCriterion" name="libelleCriterion" class="form-control" [(ngModel)]="criterion.libelle"/></div>
		</div>
		<h4>Elements: <a href="javascript:void(0)" (click)="addElement()"><i class="fa fa-plus-circle btn btn-link btn-lg" aria-hidden="true" title="Ajouter"></i></a></h4>
		<div *ngIf="selectedElement" class="panel panel-default">
			<div class="panel-heading">Edition de l'élément n° {{selectedElement.numordre}}</div>
			<div class="panel-body">
				<div class="form-group">
					<label for="codeCriterionElement" class="col-sm-2 control-label">Code</label>
					<div class="col-sm-10"><input placeholder="Code" id="codeCriterionElement" name="codeCriterionElement" class="form-control" [(ngModel)]="selectedElement.code"/></div>
				</div>
				<div class="form-group">
					<label for="libelleCriterionElement" class="col-sm-2 control-label">Libelle</label>
					<div class="col-sm-10"><input placeholder="Libelle" id="libelleCriterionElement" name="libelleCriterionElement" class="form-control" [(ngModel)]="selectedElement.libelle"/></div>
				</div>

				<button class="btn pull-right" type="button" (click)="cancelSelectedElement()">Annuler</button>
				<button class="btn pull-right button-separator" type="button" (click)="saveSelectedElement()">Valider</button>
			</div>
		</div>
		<div *ngIf="selectedElementForDelete" class="panel panel-danger">
			<div class="panel-heading">Suppression de l'élément n° {{selectedElementForDelete.numordre}}</div>
			<div class="panel-body">
				Voulez vous vraiment supprimer l'élément <strong>"{{selectedElementForDelete.libelle}}"</strong>?

				<button class="btn pull-right" type="button" (click)="cancelSelectedForDeleteElement()">Annuler</button>
				<button class="btn pull-right button-separator" type="button" (click)="deleteSelectedForDeleteElement()">Supprimer</button>
			</div>
		</div>
		<ul class="list-group">
			<li class="list-group-item clearfix" *ngFor="let criterionElement of criterion.criterionElements">
				<span class="button-align">{{criterionElement.code}} - {{criterionElement.libelle}}</span>
				<a href="javascript:void(0)" class="pull-right btn btn-link" (click)="deleteElement(criterionElement)"><i class="fa fa-trash" title="Supprimer"></i></a>
				<a href="javascript:void(0)" class="pull-right btn btn-link" [class.disabled]="criterionElement.numordre <= 1" (click)="upElement(criterionElement)"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
				<a href="javascript:void(0)" class="pull-right btn btn-link" [class.disabled]="criterionElement.numordre >= criterion.criterionElements.length" (click)="downElement(criterionElement)"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>
				<a href="javascript:void(0)" class="pull-right btn btn-link" (click)="selectedElement = criterionElement"><i class="fa fa-pencil" title="Editer"></i></a>
			</li>
		</ul>
	</div>`,
	styles: [
		`:host .list-group {
			max-height: calc(100vh - 400px);
    		overflow-y: auto;
		}`,
		`:host .button-separator {
			margin-right: 5px;
		}`]
})
export class CriterionComponent implements OnInit {
	@Input()
	public criterion : Criterion;

	public selectedElement : ICriterionElement;
	public selectedElementForDelete : ICriterionElement;

	constructor() {
	}

	ngOnInit() { }

	public addElement() {
		this.selectedElement = <ICriterionElement>{
			code: 'N',
			libelle: 'nouveau',
			numordre: this.criterion.criterionElements.length+1
		};

		/**/
	}

	public saveSelectedElement() {
		if(!this.criterion.criterionElements)
			this.criterion.criterionElements = [];

		this.criterion.criterionElements.push(this.selectedElement);

		this.selectedElement = undefined;
	}

	public cancelSelectedElement() {
		this.selectedElement = undefined;
	}

	public cancelSelectedForDeleteElement() {
		this.selectedElementForDelete = undefined;
	}

	public deleteElement(element : ICriterionElement) {
		this.selectedElementForDelete = element;
	}

	public deleteSelectedForDeleteElement() {
		this.criterion.criterionElements.splice(this.selectedElementForDelete.numordre-1, 1);
		this.selectedElementForDelete = undefined;
	}

	public upElement(element : ICriterionElement) {
		if(element.numordre > 1) {
			//recupere l'element n-1
			let previousElement = this.criterion.criterionElements[element.numordre-2];

			
			this.criterion.criterionElements[element.numordre-2] = element;
			this.criterion.criterionElements[element.numordre-1] = previousElement;
			
			element.numordre--;
			previousElement.numordre++;
		}
	}

	public downElement(element : ICriterionElement) {
		if(element.numordre < this.criterion.criterionElements.length) {
			//recupere l'element n+1
			let nextElement = this.criterion.criterionElements[element.numordre];

			this.criterion.criterionElements[element.numordre] = element;
			this.criterion.criterionElements[element.numordre-1] = nextElement;

			element.numordre++;
			nextElement.numordre--;
		}
	}
}