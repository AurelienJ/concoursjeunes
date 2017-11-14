import { Directive, ElementRef, Input, Output, HostListener, Renderer, EventEmitter, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as _ from "lodash";

@Directive({ selector: '[select2]' })
export class Select2Directive implements OnInit, OnChanges, AfterViewInit {

	private element : any;
	private isInit : boolean;

	@Input()
	public placeHolder : string;

	@Input()
	public set disable(disable : boolean) {
		this.element.prop("disabled", disable);
	};

	@Input()
	public createTag : boolean;

	@Input()
	public  value : any;

	@Output()
	private valueChange : EventEmitter<any> = new EventEmitter<any>();

	@Output()
	private onSelect : EventEmitter<Event> = new EventEmitter<Event>();

	@Output()
	private onUnselect : EventEmitter<Event> = new EventEmitter<Event>();

	@Output()
	public onTagCreated : EventEmitter<string> = new EventEmitter<string>();

    constructor(el: ElementRef, renderer: Renderer) {
    	let that = this;

        this.element = jQuery(el.nativeElement);

        this.element.on('select2:select', (e: Event) => {
			let data = that.element.select2('data');
			that.valueChange.next(data);
			that.onSelect.emit(e);
        });
        this.element.on('select2:unselect', (e: Event) => {
			that.valueChange.next(that.element.select2('data'));
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
				
				if(this.isInit) {
					if(!_.isEqual(chng.currentValue, chng.previousValue)) {
						this.element.select2('destroy');
						this.element.html("");
						this.initSelect2();

						this.element.trigger("change");
					}
				}
			}
		}
	}

	private initSelect2() {
		let that = this;

		this.element.select2({
			placeholder: this.placeHolder,
			allowClear: true,
			tags: this.createTag,
			data : that.value
		});

		this.isInit = true;
	}
}