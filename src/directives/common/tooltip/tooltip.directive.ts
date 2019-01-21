import { Directive, ElementRef, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[topTooltip]'
})

export class TooltipDirective implements AfterContentInit {
  public constructor(private el: ElementRef) {

  }

  ngAfterContentInit(){
    console.log("TooltipDirective")
  }
}