import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({ selector: '[icheck]' })
export class ICheckDirective {
	@Output()
	public change : EventEmitter<boolean> = new EventEmitter<boolean>();

	private element : any;

	constructor(el: ElementRef) {
		this.element = jQuery(el.nativeElement);
	}

	ngAfterViewInit() {
		let that = this;

		this.element.iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
			});

		this.element.on('ifToggled', function(event : any){
			that.change.emit(that.element[0].checked);
		});
   }
}