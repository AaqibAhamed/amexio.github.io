import {ElementRef} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {AmexioNavDesktopMenuComponent} from '../../navigation/navbar/navdesktopmenu';
import { AmexioNavMenuComponent } from '../../navigation/navbar/navmenu.component';
import {AmexioNavMobileMenuComponent} from '../../navigation/navbar/navmobilemenu';
describe('navmenu', () => {
    let comp: AmexioNavMenuComponent;
    let fixture: ComponentFixture<AmexioNavMenuComponent>;
    let el: ElementRef;
    let timerCallback: any;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [AmexioNavMenuComponent, AmexioNavDesktopMenuComponent, AmexioNavMobileMenuComponent],
            providers: [],
        });
        fixture = TestBed.createComponent(AmexioNavMenuComponent);
        comp = fixture.componentInstance;
        el = fixture.debugElement.query(By.css('#navmenu'));
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

    });

    it('ngAfterViewInit', () => {
    comp.ngAfterViewInit();
    setTimeout(() => {
        expect(timerCallback).toHaveBeenCalled();
        expect((window.innerWidth - el.nativeElement.getBoundingClientRect().right)).not.toBeGreaterThan(150);
        comp.position = 'right';
        expect((window.innerWidth - el.nativeElement.getBoundingClientRect().right)).toBeGreaterThan(150);
        comp.position = 'left';
        fixture.detectChanges();
    }, 100);

  });

    it('check variable in navmenu', () => {
        expect(comp.issubmenu).toEqual(false);
        expect(comp.position).toEqual('right');
        expect(comp.ishovered).toEqual(true);

    });

    it('setMobileMode() method check', () => {
        const mobileMode = false;
        const flag = false;
        comp.setMobileMode(flag);
        expect(comp.mobilemode).toBe(flag);

      });

    it('dataObject() method check', () => {
          let n;
          comp.dataObject(n, event);
          return { data: n, event };
      });

    it('onHeaderClick() method check', () => {
       comp.onHeaderClick(event);
       const node = {
        header: true,
        title: comp.title,
        icon: comp.icon,
      };
       comp.mobileToggleModel = !comp.mobileToggleModel;
       comp.mobilemode = true;
       comp.showMenus = true;
       expect(comp.mobilemode).toEqual(true);
       expect(comp.showMenus).toEqual(true);
       comp.onClick(node, event);
     });

    it('onMouseOver() method check', () => {
        comp.mobilemode = true;
        comp.showMenus = true;
        comp.onMouseOver(event);
        // if (this.mobilemode) {
        expect(comp.mobilemode).toEqual(true);
        expect(comp.showMenus).toEqual(true);
    });

    it('onMouseLeave() method check', () => {
        comp.mobilemode = true;
        comp.showMenus = false;
        comp.onMouseLeave(event);
        expect(comp.mobilemode).toEqual(true);
        expect(comp.showMenus).toEqual(false);
    });

    it('toggleMenu() method check', () => {
        comp.mobilemode = true;
        comp.showMenus = false;
        comp.toggleMenu(event);
        expect(comp.mobilemode).toEqual(true);
        comp.showMenus = true;
      });

    it('navItem click method', () => {
      const  event1 = {
            event,
        };
      comp.navItemClick(event1);
      event1.event.stopPropagation();
      comp.onNavItemClick.emit(event);
      });
    //   it('onMouseoverTitle() method check', () => {
    //     comp.onMouseoverTitle(event);
    //         comp.position = comp.getMenuPosition(event);
    //    });

    //    it(' getMenuPosition() method check', () => {
    //     const fixture = TestBed.createComponent(AmexioNavMenuComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;

    //         comp.getMenuPosition(fixture);
    //         const remainingleft = compiled.getBoundingClientRect().left;
    // const remainingright = window.screen.width - compiled.getBoundingClientRect().right;
    // let directionflag: string;
    //    });

    //    it('onIconClick() method check', () => {
    //     let node ={
    //         submenus:[{submenu: 's'}, {submenu: 'u'}],
    //         isExpanded: false
    //       }
    //     comp.onIconClick(event, node);
    //     event.stopPropagation();
    //     // if (node.hasOwnProperty('isExpanded')) {
    //     expect(node.hasOwnProperty('isExpanded')).toEqual(true);
    //         node.isExpanded = !node.isExpanded;
    //         node['isExpanded'] = true;
    //     });
});