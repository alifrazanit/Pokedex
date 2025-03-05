import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSearchComponent } from './field-search.component';

describe('FieldSearchComponent', () => {
  let component: FieldSearchComponent;
  let fixture: ComponentFixture<FieldSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
