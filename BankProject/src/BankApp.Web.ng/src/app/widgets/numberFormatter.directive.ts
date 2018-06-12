import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, ElementRef, HostListener } from '@angular/core';
import { MSNumberPipe } from "./numberFormatter.pipe";
@Directive({
    selector: '[msNumberFormatter]'

})
export class MSNumberFormatter implements OnInit {
    private el: any;

    constructor(private elementRef: ElementRef,
        private numberPipe: MSNumberPipe) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.el.value = this.numberPipe.transform(this.el.value);
    }

    @HostListener("focus", ["$event.target.value"])
    onFocus(value) {
        this.el.value = this.numberPipe.parse(value); // opossite of transform
    }

    @HostListener("blur", ["$event.target.value"])
    onBlur(value) {
        this.el.value = this.numberPipe.transform(value);
    }
}


@Directive({
    selector: '[msIntegerFormatter]'

})
export class MSIntegerFormatter implements OnInit {
    private el: any;

    constructor(private elementRef: ElementRef,
        private numberPipe: MSNumberPipe) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.el.value = this.numberPipe.transform(this.el.value,0);
    }

    @HostListener("focus", ["$event.target.value"])
    onFocus(value) {
        this.el.value = this.numberPipe.parse(value,0); // opossite of transform
    }

    @HostListener("blur", ["$event.target.value"])
    onBlur(value) {
        this.el.value = this.numberPipe.transform(value,0);
    }
}
