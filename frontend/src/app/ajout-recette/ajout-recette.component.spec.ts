import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRecetteComponent } from './ajout-recette.component';

describe('AjoutRecetteComponent', () => {
  let component: AjoutRecetteComponent;
  let fixture: ComponentFixture<AjoutRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutRecetteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
