import { Directive, ElementRef, Input, Output, HostListener, Renderer, EventEmitter, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import _ from "lodash";

@Directive({ selector: '[select2]' })
export class Select2Directive implements OnInit, OnChanges, AfterViewInit {

	private element : any;

	@Input()
	public placeHolder : string;

	@Input()
	public set disable(disable : boolean) {
		this.element.prop("disabled", disable);
	};

	@Input()
	public  value : any;

	@Output()
	private onSelect : EventEmitter<Event> = new EventEmitter<Event>();

	@Output()
	private onUnselect : EventEmitter<Event> = new EventEmitter<Event>();

	@Output()
	private valueChange : EventEmitter<any> = new EventEmitter<any>();
	
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
			that.valueChange.next(that.element.val());
			that.onSelect.emit(e);
        });
        this.element.on('select2:unselect', function (e: Event) {
			that.valueChange.next(that.element.val());
			that.onUnselect.emit(e);
        });
    }

	ngOnInit(): void {
		
	}

	ngAfterViewInit() {
		 this.initSelect2();
	}

	ngOnChanges(changes : SimpleChanges) {
		for (let propName in changes) {
			if(propName == 'value') {
				let chng = changes[propName];
				
				if(!_.isEqual(chng.currentValue, chng.previousValue)) {
					this.initSelect2();
					
					this.element.val(chng.currentValue);
					this.element.trigger("change");
				}
			}
		}
	}

	private initSelect2() {
		if(this.element.data('select2'))
			this.element.select2("destroy");

		this.element.select2({
			placeholder: this.placeHolder,
			allowClear: true
		});
	}
}