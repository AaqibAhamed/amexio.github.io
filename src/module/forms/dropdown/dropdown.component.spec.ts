/**
 * Created by kedar on 26/6/19.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexioDropDownComponent } from './dropdown.component';
import { CommonDataService } from '../../services/data/common.data.service';
import { HttpClientModule } from '@angular/common/http';
import { DisplayFieldComponent } from '../../base/display-field/display-field.component';
import { CommonIconComponent } from '../../base/components/common.icon.component';


describe('amexio-dropdown', () => {
  let comp: AmexioDropDownComponent;
  let fixture: ComponentFixture<AmexioDropDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [AmexioDropDownComponent, DisplayFieldComponent,CommonIconComponent],
      providers: [IconLoaderService, CommonDataService],
    });
    fixture = TestBed.createComponent(AmexioDropDownComponent);
    comp = fixture.componentInstance;
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

    it('true is true', () => expect(true).toBe(true));
  });

  //check variables 
  it('check variables in dropdown component ', () => {
    expect(comp.selectedindex).toEqual(-1);
    expect(comp.multiselectValues).toEqual([]);
    expect(comp.maskloader).toEqual(true);
    expect(comp.activedescendant).toBe('aria-activedescendant');
    expect(comp.key).toBe('index');
    expect(comp.displayValue).toBe('');
    expect(comp.filteredOptions).toEqual([]);
  });


  it('should call get function and return true', () => {
    // comp.data();
    expect(comp.data).toBe(undefined);
    let item = comp.value;
    comp._data = item;
    
    expect(comp.componentLoaded).toBe(undefined);
  
});

it('onChange() method check', () => {
  let value = 'kedar';
  comp.onChange(value);
  expect(comp.innerValue).toBe(value);
  comp.isValid = true;
  expect(comp.isValid).toBe(true);
  // comp.isComponentValid.subscribe((g: any) => {
  //   expect(comp.isComponentValid).toEqual(g);
  // });
});


  //multiSelection check

  // it('check multiSelection method',() =>{

  //   comp.multiSelection();
  //   let checkData = true;
  //   expect(comp.multiselect).toEqual(checkData);
  //   expect(comp.viewData).toEqual(checkData);
    

  // })
});
