/*
 Component Name : Amexio Carousel
 Component Selector : <[amexioTemplate]>
 Component Description : Amexio CarouselView displays a collection of images or other content in a horizontal layout with built-in navigation between the items.



*/

import {Directive, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
@Directive({
  selector: '[amexioTemplate]', host: {}
})
export class AmexioTemplate {

  @Input() type: string;

  @Input('amexioTemplate') name: string;

  constructor(public template: TemplateRef<any>) {
  }

  getType(): string {
    return this.name;
  }
}


@Directive({
  selector: '[amexioTemplateWrapper]'
})
export class AmexioTemplateWrapper implements OnInit, OnDestroy {

  /*
Properties 
name : index
datatype :  number
version : 4.0 onwards
default : none
description : its a index of the collection of item of items.
*/ 
  @Input() index: number;

   /*
Properties 
name : amexioTemplateWrapper
datatype :  templateRef
version : 4.0 onwards
default : none
description : renders the carousel items in a collection
*/ 
  @Input('amexioTemplateWrapper') templateRef: TemplateRef<any>;

  view: EmbeddedViewRef<any>;

  _item: any;

  constructor(public viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    this.render();
  }

  set item(item: any) {
    this._item = item;

    if (this.view) {
      this.view.destroy();
      this.render();
    }
  }

   /*
Properties 
name : get item
datatype :   any
version : 4.0 onwards
default : none
description : gets the carousel item
*/ 
  @Input() get item(): any {
    return this._item;
  }

  render() {
    this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
      '\$implicit': this.item, 'index': this.index
    });
  }

  ngOnDestroy() {
    this.view.destroy();
  }
}
