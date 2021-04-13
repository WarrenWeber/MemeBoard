import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemesCategoryComponent } from './memes-category.component';

describe('MemesCategoryComponent', () => {
  let component: MemesCategoryComponent;
  let fixture: ComponentFixture<MemesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemesCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
