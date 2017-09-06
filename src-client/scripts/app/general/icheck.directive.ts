import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[icheck]' })
export class ICheckDirective {
	private element : any;

	constructor(el: ElementRef) {
		this.element = jQuery(el.nativeElement);
	}

	ngAfterViewInit() {
		this.element.iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
            });
   }
}