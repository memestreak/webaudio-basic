import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatSliderModule } from '@angular/material/slider'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 

@Component({
  selector: 'app-myform',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  templateUrl: './myform.component.html',
  styleUrl: './myform.component.css',
})

export class MyformComponent {
  myForm: FormGroup;
  enabledOrDisabled: string = 'disabled';

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
        hz: [50],
        volume: [50],
        startStop: false,
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and
    //the first call to ngOnChanges.  Add 'implements OnInit' to the
    //class.
    console.log('ngOnInit');

    this.myForm.get('hz')!.valueChanges.subscribe(
      this.onHzChange.bind(this));
    // this.myForm.get('enable')!.valueChanges.subscribe(
    //   this.onEnableChange.bind(this));
  }

  onHzChange(newHz: number) {
    console.log('onHzChange', newHz, 'typeof newHz: ', typeof newHz);
  }

  onEnableChange(newEnable: boolean) {
    //console.log('onEnableChange', newEnable, 'typeof newEnable: ', typeof newEnable);
  }

  // onOnOffChange() {
  //   console.log('onOnOffChange');
  //   if (this.enabledOrDisabled == 'disadbled') {
  //     this.enabledOrDisabled = 'enabled';
  //   } else {
  //     this.enabledOrDisabled = 'disadbled';
  //   }
  // }
}
