import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

// Mock version of AudioControlsComponent
@Component({
  selector: 'app-audio-controls',
  standalone: true,
  template: ''
})
class MockAudioControlsComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent
      ],
      declarations: []
    })
    .overrideComponent(AppComponent, {
      set: {
        imports: [MockAudioControlsComponent],
      }
    })
    .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'webaudio-basic' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('webaudio-basic');
  });
});
