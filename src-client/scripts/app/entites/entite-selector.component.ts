import { Component, OnInit, Optional, Inject, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR} from '@angular/forms';
import { Observable } from 'rxjs';

import { EntitesService } from "./entites.service";
import { IEntite } from "./ientite";

@Component({
	selector: 'entite-selector',
	template: `<span *ngIf="entite" ><a [routerLink]="['/entities', entite.id]">{{entite.nom}}</a> - </span>
	<a *ngIf="!isDisabled" [routerLink]="[onlyFederations ? '/federations' : '/entities']" [queryParams]="{forSelect : true}" id="entity">Choisir...</a>`,
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		useExisting: EntiteSelectorComponent,
		multi: true,
	}]
})

export class EntiteSelectorComponent implements OnInit, ControlValueAccessor {

	@Input()
	public onlyFederations: boolean = false;

	@ViewChild(NgModel) model: NgModel;

	public isDisabled: boolean = false;
	public entite: IEntite;

	private idEntite: string;
	private changed = new Array<(value: IEntite) => void>();
	private touched = new Array<() => void>();

	constructor(
		private entitesService: EntitesService) { }

	ngOnInit() {
	}

	writeValue(value: any): void {
		this.idEntite = value;

		if (this.idEntite)
			this.entitesService.getEntity(this.idEntite).then(e => this.entite = e);
	}

	registerOnChange(fn: any): void {
		this.changed.push(fn);
	}

	registerOnTouched(fn: any): void {
		this.touched.push(fn);
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}
}