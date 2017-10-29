import { Directive, ElementRef, Input, Output, Renderer, EventEmitter, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Directive({ selector: '[slimscroll]', exportAs:"slimscroll" })
export class SlimScrollDirective {
	private element : JQuery;

    constructor(el: ElementRef, renderer: Renderer) {
		this.element = jQuery(el.nativeElement);
	}
	ngAfterViewInit() {
		let that = this;

		(<any>that.element).slimScroll({
            height: window.innerHeight - that.element.offset().top,
			railVisible: true,
			railColor: '#eeeeee',
			railOpacity: 0.3,
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event : any) {
		let that = this;
		(<any>that.element).slimScroll({
            height: window.innerHeight - that.element.offset().top
        });
	}
}