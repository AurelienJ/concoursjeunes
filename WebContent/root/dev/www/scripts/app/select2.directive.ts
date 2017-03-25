///<reference path="_references.ts"/>

import { Directive, ElementRef, Input, Output, HostListener, Renderer, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Directive({ selector: '[select2]' })
export class Select2Directive implements OnInit {

	private element : JQuery;

	@Input()
	private placeHolder : string;

	@Input()
	private set disable(disable : boolean) {
		this.element.prop("disabled", disable);
	};

	@Output()
	private onSelect : EventEmitter<Event> = new EventEmitter<Event>();

	@Output()
	private onUnselect : EventEmitter<Event> = new EventEmitter<Event>();

	@Output()
	private value : EventEmitter<any> = new EventEmitter<any>();
	
	// @HostListener('select2:select')
	// private select(e: Event) {
	// 	this.value.next(this.element.val());
	// 	this.onSelect.emit(e);
	// }

	// @HostListener('select2:unselect')
	// private unselect(e: Event) {
	// 	this.value.next(this.element.val());
	// 	this.onUnselect.emit(e);
	// }

    constructor(el: ElementRef, renderer: Renderer) {
    	let that = this;

        this.element = jQuery(el.nativeElement);

        this.element.on('select2:select', function (e: Event) {
			that.value.next(that.element.val());
			that.onSelect.emit(e);
        });
        this.element.on('select2:unselect', function (e: Event) {
			that.value.next(that.element.val());
			that.onUnselect.emit(e);
        });
    }

	ngOnInit(): void {
		this.element.select2({
            placeholder: this.placeHolder,
            allowClear: true
        });

		this.value.next(this.element.val());
	}
}