import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedGameComponent } from './mixed-game.component';

describe('MixedGameComponent', () => {
  let component: MixedGameComponent;
  let fixture: ComponentFixture<MixedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
