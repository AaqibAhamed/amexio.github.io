/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* Created by ketangote on 12/1/17.
*/

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AmexioTabPillComponent } from '../tab.pill.component';
import { BaseTabComponent } from './../base.tab.component';

@Component({
  selector: 'amexio-vertical-tab-view',
  templateUrl: './vertical.tab.component.html',
})

export class AmexioVerticalTabComponent extends BaseTabComponent implements AfterContentInit, AfterViewInit, OnInit {

  @ViewChild('tab', { read: ElementRef }) public tabs: ElementRef;

  @ContentChildren(AmexioTabPillComponent) queryTabs: QueryList<AmexioTabPillComponent>;

  @ViewChild('target', { read: ViewContainerRef }) target: any;

  @ViewChild('tabId') tabId: ElementRef;

  @ViewChild('icon') icon: ElementRef;
  /*
   Properties
   name : closable
   datatype : boolean
   version : 4.0 onwards
   default : false
   description : This flag will make tab closable.
   */
  @Input() closable: boolean;
  /*
   Properties
   name :tab-position
   datatype : string
   version : 4.1.9 onwards
   default : top
   description : Position of tab can be (top/bottom)
   */
  @Input() tabPosition: string;
  /*
   Properties
   name :rotate
   datatype : boolean
   version : 5.12.2 onwards
   default : false
   description : tab header alignment
   */
  @Input() rotate = false;

  tabCollection: AmexioTabPillComponent[];

  componentId = '';

  height = 580;
  rotatedtabsHeight = '342';
  iconCount: number;
  constructor(public render: Renderer2, public componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
    this.tabPosition = 'top';
  }
  ngOnInit() {
    this.componentId = Math.floor(Math.random() * 90000) + 10000 + '_tabc';
  }
  ngAfterViewInit() {
    if (this.tabId && this.tabId.nativeElement && this.tabId.nativeElement.offsetWidth) {
      const tabsheight = this.tabId.nativeElement.offsetWidth;
      if (tabsheight > this.height) {
        this.height = tabsheight;
      }
      this.rotatedtabsHeight = tabsheight;
    }
  }
  ngAfterContentInit() {
    this.tabCollection = this.queryTabs.toArray();
    const testarray: any[] = [];
    this.tabCollection.forEach((element: any) => {
      if (element.icon) {
        testarray.push(element.icon);
      }
    });
    this.iconCount = testarray.length;
  }

  closeAllTabs() {
    this.tabCollection.forEach((tabs) => {
      if (tabs.closable === true || this.closable === true) {
        this.tabPillClose(tabs);
      }
    });
  }

  closeTabs(data: any) {
    const tabList: any[] = [];
    this.tabCollection.forEach((tabs) => {
      tabs.active = false;
      data.forEach((opt: any) => {
        if (opt.toLowerCase() !== tabs.title.toLowerCase() && (tabs.closable === true || this.closable === true)) {
          this.tabPillClose(tabs);
        } else {
          tabList.push(tabs);
          this.asignTabPillClass(tabs);
        }
      });

    });
    tabList[tabList.length - 1].active = true;
    this.asignTabPillClass(tabList[tabList.length - 1]);

  }
  tabDomRemove(tab: any) {
    const removeNode = document.getElementById(tab.tabId).parentNode;
    const parentRefNode = removeNode.parentNode;
    parentRefNode.removeChild(removeNode);
  }
  activateTab(tabId: number) {
    this.tabCollection.forEach((tab) => {
      tab.active = false;
    });
  }
}
