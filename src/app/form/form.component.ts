import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { Row } from '../main/mail.interface';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit, OnDestroy {
  @Output() messageEvent = new EventEmitter();
  private editSubscription!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dataService: DataService
  ) {}
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    status: new FormControl(''),
  });
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.editSubscription = this.dataService.refreshRow$.subscribe(
      (rowData: Row) => {
        this.form.patchValue(rowData);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.form.value.id === null) {
      this.userService.addUser(this.form.getRawValue()).subscribe((result) => {
        this.dataService.tiggerDataTableRefresh();
      });
    } else {
      this.userService
        .updateUser(this.form.getRawValue())
        .subscribe((result) => {
          this.dataService.tiggerDataTableRefresh();
        });
    }

    this.form.reset();
  }
}
