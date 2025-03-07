import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioformComponent } from './audioform.component';

describe('AudioformComponent', () => {
  let component: AudioformComponent;
  let fixture: ComponentFixture<AudioformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
