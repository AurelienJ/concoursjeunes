///<reference path="_references.ts"/>

import { Directive, ElementRef, Input, Output, Renderer, EventEmitter, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Directive({ selector: '[slimscroll]' })
export class SlimScrollDirective {
	private element : JQuery;

    constructor(el: ElementRef, renderer: Renderer) {
    	let that = this;

        this.element = jQuery(el.nativeElement);
        (<any>this.element).slimScroll({
            height: 'auto',
			railVisible: true,
			railColor: '#eeeeee',
			railOpacity: 0.3,
        });
    }

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		(<any>this.element).slimScroll({
            height: event.target.innerHeight -50
        });

		
	}
}