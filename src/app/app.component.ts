import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyformComponent } from './myform/myform.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MyformComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'webaudio-basic';
}
