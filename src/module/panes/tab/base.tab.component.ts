import {
    Component, ComponentFactoryResolver, ContentChildren, ElementRef, EventEmitter,
    Input, Output, QueryList, ViewChild, ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AmexioTabPillComponent } from './tab.pill.component';

import { LifeCycleBaseComponent } from '../../base/lifecycle.base.component';

// @Component({
//     selector: 'list.base.datepicker',
//     template: './list.base.datepicker.component.html',
//   })

export class BaseTabComponent extends LifeCycleBaseComponent {
    @ViewChild('target', { read: ViewContainerRef }) target: any;
    @ContentChildren(AmexioTabPillComponent) queryTabs: QueryList<AmexioTabPillComponent>;
    tabCollection: AmexioTabPillComponent[];
    @Input('tab-position') tabPosition: string;
    @ViewChild('tab', { read: ElementRef }) public tabs: ElementRef;
    @ViewChild('tabslist', { read: ElementRef }) public tabslist: ElementRef;
    @Input('divide-header-equally') fullPageTabs: boolean;
    @Input('active-bg-color') activeBGColor: boolean;
    @Input('body-height') bodyheight: any;
    /*
     Properties
     name : closable
     datatype : boolean
     version : 4.0 onwards
     default : false
     description : This flag will make tab closable.
     */
    @Input() closable: boolean;
    singleTabWidth: any;
    minHeight: any;
    totalTabs: number;

    constructor(public componentFactoryResolver: ComponentFactoryResolver) {
        super();
        this.tabPosition = 'top';
    }

    dummyArray: any[] = [];
    shownext = false;
    height: any;
    tabType: string;
    addDynamicTab(title: string, amexiocolor: string, closable: boolean, component: any) {
        // get a component factory for our TabComponent
        const tpCF = this.componentFactoryResolver.resolveComponentFactory(
            AmexioTabPillComponent,
        );
        const tp = this.target.createComponent(tpCF);
        // set the according properties on our component instance
        const instance: AmexioTabPillComponent = tp.instance as AmexioTabPillComponent;
        instance.title = title;
        instance.active = true;
        instance.closable = closable;
        instance['tabpillinstance'] = this.target;
        if (instance.amexiocolor === '') {
            instance.amexiocolor = 'amexio-top-tab-black';
        } else {
            instance.amexiocolor = 'amexio-top-tab-' + amexiocolor;
        }
        // create dynamic component
        const dynCF = this.componentFactoryResolver.resolveComponentFactory(
            component,
        );
        const dynCmp = tp.instance.target.createComponent(dynCF);

        // Push new tab and select it.
        this.dummyArray.push(tp);
        this.tabCollection.push(tp.instance);
        this.selectTab(tp.instance);
        if (this.tabType === 'horizontal') {
            this.adjustWidth();
        }
        return dynCmp.instance;
    }

    selectTab(tab: AmexioTabPillComponent) {
        // deactivate all tabs
        this.tabCollection.forEach((tab1: any) => {
            tab1.active = false;
        });
        tab.active = true;
        this.tabCollection.forEach((tab1: any) => {
            this.asignTabPillClass(tab1);
        });
    }

    tabPillClose(tabNode: AmexioTabPillComponent) {
        const newTab: AmexioTabPillComponent[] = [];
        let index = 0;
        let tabHighlightIndex = 0;
        this.tabCollection.forEach((tab: any, i: number) => {
            tab.active = false;
            if (tab.tabId === tabNode.tabId) {
                tabHighlightIndex = index;
                if (tab.hasOwnProperty('tabpillinstance')) {
                    tab.target.remove();
                } else {
                    this.tabDomRemove(tab);
                }
            } else if (tab.tabId !== tabNode.tabId) {
                newTab.push(tab);
            }
            index++;
        });
        if (tabHighlightIndex === newTab.length) {
            tabHighlightIndex--;
        }
        this.tabCollection = newTab;
        if (tabHighlightIndex > -1) {
            this.activateTab(newTab[tabHighlightIndex].tabId);
        } else {
            this.activateTab(null);
        }
        if (this.tabCollection.length === 1) {
            this.closable = false;
        }
        if (newTab.length === 1) {
            newTab[0].closable = false;
        }
    }

    activateTab(tabId: number) {
        if (tabId !== null) {
            this.tabCollection.forEach((tab) => {
                tab.active = false;
                if (tab.tabId === tabId) {
                    tab.active = true;
                }
                this.asignTabPillClass(tab);
            });
        }
    }

    tabDomRemove(tab: any) {
        const removeNode = document.getElementById(tab.tabId).parentNode;
        const parentRefNode = removeNode.parentNode;
        parentRefNode.removeChild(removeNode);

    }

    asignTabPillClass(tabData: any) {
        tabData.tabPillClass = '';
        if ((!tabData.amexiocolor || tabData.amexiocolor === '') && tabData.active && (this.tabPosition === 'top')) {
            tabData.tabPillClass = 'activetab';
        }
        if ((!tabData.amexiocolor || tabData.amexiocolor === '') && (this.tabPosition === 'bottom') && tabData.active) {
            tabData.tabPillClass = 'bottomActivetab';
        }
        if (tabData.disabled) {
            tabData.tabPillClass = 'disabled-tab';
        }
        if ((tabData.amexiocolor !== '') && (this.tabPosition === 'top') && tabData.active && !this.activeBGColor) {
            tabData.tabPillClass = 'activecolortab';
        }
        if ((tabData.amexiocolor !== '') && (this.tabPosition === 'top') && tabData.active && this.activeBGColor) {
            tabData.tabPillClass = 'activebgcolortab';
        }
        if ((tabData.amexiocolor !== '') && (this.tabPosition === 'bottom') && tabData.active) {
            tabData.tabPillClass = 'activebottomcolortab';
        }
    }

    adjustWidth() {
        const tWidth = this.tabs.nativeElement.clientWidth;
        const tlistWidth = this.tabslist.nativeElement.scrollWidth;
        const hWidth = 0;
        const totalElWidth = tlistWidth + hWidth;

        if (totalElWidth > tWidth) {
            this.shownext = true;
        } else {
            this.shownext = false;
        }

        if (this.fullPageTabs === true) {
            if (totalElWidth > tWidth && this.fullPageTabs) {
                this.shownext = true;
            } else {
                this.singleTabWidth = totalElWidth / this.totalTabs;
            }
        }
        this.onAdjustHeight();
    }

    onAdjustHeight() {
        if (this.bodyheight) {
            let h = (window.innerHeight / 100) * this.bodyheight;

            if (this.tabs && this.tabs.nativeElement && this.tabs.nativeElement.offsetHeight) {
                h = h - this.tabs.nativeElement.offsetHeight;
            }
            if (this.bodyheight === 100) {
                h = h - 40;
            }
            this.minHeight = h;
            this.height = h;
        }
    }
}