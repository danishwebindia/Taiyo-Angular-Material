import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { Row } from '../main/mail.interface';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
})
export class DatatableComponent implements OnInit, OnDestroy {
  rows: Row[] = [];
  constructor(
    private userService: UserService,
    private dataService: DataService
  ) {}
  private refreshSubscription!: Subscription;

  ngOnInit(): void {
    this.refreshSubscription = this.dataService.refreshDataTable$.subscribe(
      () => {
        this.userService.getUser().subscribe((res) => {
          this.rows = res;
        });
      }
    );

    this.userService.getUser().subscribe((res) => {
      this.rows = res;
    });
  }

  deleteUser(data: Row) {
    this.userService.deleteUser(data).subscribe((res) => {
      this.dataService.tiggerDataTableRefresh();
    });
  }

  editUser(data: Row) {
    this.dataService.tiggerRowRefresh(data);
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
