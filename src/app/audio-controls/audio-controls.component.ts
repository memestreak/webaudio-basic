import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSliderModule, MatSliderVisualThumb } from '@angular/material/slider'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { SlicePipe } from '@angular/common';

const FREQUENCY_MIN_HZ = 20;
const FREQUENCY_MAX_HZ = 20000;
const VOLUME_MAX = 100;
const VOLUME_DEFAULT = 10;

@Component({
  selector: 'app-audio-controls',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  templateUrl: './audio-controls.component.html',
  styleUrl: './audio-controls.component.css',
})
export class AudioControlsComponent implements OnInit, OnDestroy {
  audioControlsFormGroup: FormGroup;
  audioContext: AudioContext;
  oscillator: OscillatorNode;
  gainNode: GainNode;
  sliderValue = 0.5;
  frequency = this.sliderValueToHz(this.sliderValue);

  /**
   * Creates a form group for the audio controls.
   *
   * NOTE: An access modifier added to a contructor parameter automatically
   *      creates a class property with the same name.
   * 
   * @param formBuilder 
   */
  constructor(private formBuilder: FormBuilder) {
    const initialHz = this.sliderValueToHz(0.5);

    this.audioControlsFormGroup = this.formBuilder.group({
      hzSlider: [0.5],          // Starting slider value for UI
      hz: [initialHz],          // Actual frequency used for audio
      volume: [VOLUME_DEFAULT], // Safe
      startStop: [false],
    });

    // Create the AudioContext and nodes
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.oscillator = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = VOLUME_DEFAULT / 100;
    this.oscillator.frequency.value = initialHz;

    // Wire things up: oscillator --> gainNode --> destination
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
  }

  ngOnInit(): void {
    // Start the oscillator
    this.oscillator.start();

    // Subscribe to changes in the volume form control
    this.audioControlsFormGroup.get('volume')!.valueChanges.subscribe((newVolume: number) => {
      this.gainNode.gain.setValueAtTime(newVolume / 100, this.audioContext.currentTime);
    });

    // Subscribe to changes in the startStop form control
    this.audioControlsFormGroup.get('startStop')!.valueChanges.subscribe((start: boolean) => {
      if (start) {
        this.audioContext.resume();
      } else {
        this.audioContext.suspend();
      }
    });

    // Subscribe to frequency slider changes
    this.audioControlsFormGroup.get('hzSlider')!.valueChanges.subscribe(
      this.handleFrequencySliderChange.bind(this));
  }

  // Returns a frequency appropriate for a slider, where the slider value is
  // between 0 and 1.
  private sliderValueToHz(sliderValue: number): number {
    return Math.round(
      FREQUENCY_MIN_HZ *
      Math.pow(
      Math.E,
      Math.log(FREQUENCY_MAX_HZ / FREQUENCY_MIN_HZ) * sliderValue));
  }

  // Handler for frequency slider changes
  private handleFrequencySliderChange(sliderValue: number): void {
    this.sliderValue = sliderValue;
    this.frequency = this.sliderValueToHz(this.sliderValue);

    // Update the actual frequency value in the form for audio processing
    this.audioControlsFormGroup.get('hz')!.setValue(this.frequency, {emitEvent: false});

    // Update the audio node if it's playing
    this.updateFrequency(this.frequency);
  }

  // Handles the button toggle for start/stop.
  toggleAudio(): void {
    const startStopControl = this.audioControlsFormGroup.get('startStop');
    if (startStopControl) {
      startStopControl.setValue(!startStopControl.value);
    }
  }

  // Update the frequency of the oscillator.
  updateFrequency(freq: number) {
    if (this.oscillator) {
      this.oscillator.frequency.value = freq;
    }
  }

  ngOnDestroy(): void {
    // Stop the oscillator and close the audio context
    this.oscillator.stop();
    this.audioContext.close();
  }
}
