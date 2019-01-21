import { Component, Input, ElementRef, AfterContentInit } from '@angular/core';
import { TooltipModel } from 'src/models/common/tooltipModel';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html'
})

export class TooltipComponent implements AfterContentInit {
  @Input() model: TooltipModel;

  constructor(private element: ElementRef) { }

  ngAfterContentInit(){
    this.element.nativeElement.style.top = this.model.topPosition + "px";
    this.element.nativeElement.style.left = this.model.leftPosition + "px";

    console.log()
  }
}