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
		<h4>Elements: <a href="javascript:void(0)" (click)="addElement()"><i class="fa fa-plus-circle" aria-hidden="true" title="Ajouter"></i></a></h4>
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
			<li class="list-group-item" *ngFor="let criterionElement of criterion.criterionElements">
			{{criterionElement.code}} - {{criterionElement.libelle}}
			<a href="javascript:void(0)" class="pull-right" (click)="deleteElement(criterionElement)"><i class="fa fa-trash" title="Supprimer"></i></a>
			<a href="javascript:void(0)" class="pull-right button-separator" [class.disabled]="criterionElement.numordre <= 1" (click)="upElement(criterionElement)"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>
			<a href="javascript:void(0)" class="pull-right button-separator" [class.disabled]="criterionElement.numordre >= criterion.criterionElements.length" (click)="downElement(criterionElement)"><i class="fa fa-arrow-down" aria-hidden="true"></i></a>
			<a href="javascript:void(0)" class="pull-right button-separator" (click)="selectedElement = criterionElement"><i class="fa fa-pencil" title="Editer"></i></a>
			</li>
		</ul>
	</div>`,
	styles: [
		`:host .list-group {
			max-height: 200px;
    		overflow-y: auto;
		}`,
		`:host .button-separator {
			margin-right: 5px;
		}`]
})
export class CriterionComponent implements OnInit {
	@Input()
	criterion : Criterion;

	selectedElement : ICriterionElement;
	selectedElementForDelete : ICriterionElement;

	constructor() {
	}

	ngOnInit() { }

	addElement() {
		this.selectedElement = <ICriterionElement>{
			code: 'N',
			libelle: 'nouveau',
			numordre: this.criterion.criterionElements.length+1
		};

		/**/
	}

	saveSelectedElement() {
		if(!this.criterion.criterionElements)
			this.criterion.criterionElements = [];

		this.criterion.criterionElements.push(this.selectedElement);

		this.selectedElement = undefined;
	}

	cancelSelectedElement() {
		this.selectedElement = undefined;
	}

	cancelSelectedForDeleteElement() {
		this.selectedElementForDelete = undefined;
	}

	deleteElement(element : ICriterionElement) {
		this.selectedElementForDelete = element;
	}

	deleteSelectedForDeleteElement() {
		this.criterion.criterionElements.splice(this.selectedElementForDelete.numordre-1, 1);
		this.selectedElementForDelete = undefined;
	}

	upElement(element : ICriterionElement) {
		if(element.numordre > 1) {
			//recupere l'element n-1
			let previousElement = this.criterion.criterionElements[element.numordre-2];

			
			this.criterion.criterionElements[element.numordre-2] = element;
			this.criterion.criterionElements[element.numordre-1] = previousElement;
			
			element.numordre--;
			previousElement.numordre++;
		}
	}

	downElement(element : ICriterionElement) {
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