import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[control-sidebar]',
})
export class ControlSidebarDirective {
    private element : JQuery;
    
    constructor(el: ElementRef, renderer: Renderer) {
        this.element = jQuery(el.nativeElement);
    }

    ngAfterViewInit() {
        //(<any>$).AdminLTE.controlSidebar.activate();
        //if(typeof (<any>this.element).controlSidebar === "function")
        //    (<any>this.element).controlSidebar();
    }
}