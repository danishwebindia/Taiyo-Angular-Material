import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { DatatableComponent } from '../datatable/datatable.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormComponent,DatatableComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
