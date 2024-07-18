import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Row } from './main/mail.interface';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private refreshDataSubject = new Subject<void>();
  private refreshRow = new Subject<Row>();
  refreshDataTable$ = this.refreshDataSubject.asObservable();
  refreshRow$ = this.refreshRow.asObservable();
  constructor() {}

  tiggerDataTableRefresh() {
    this.refreshDataSubject.next();
  }

  tiggerRowRefresh(rowData: Row) {
    this.refreshRow.next(rowData);
  }
}
