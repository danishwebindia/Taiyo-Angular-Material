import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './environment';
import { Row } from './main/mail.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<Row[]> {
    return this.http.get<Row[]>(`${API_URL}/users`);
  }

  addUser(data: Row): Observable<Row[]> {
    return this.http.post<Row[]>(`${API_URL}/users`, data);
  }

  updateUser(data: Row): Observable<Row[]> {
    return this.http.put<Row[]>(`${API_URL}/users/${data.id}`, data);
  }

  deleteUser(data: Row): Observable<Row[]> {
    return this.http.delete<Row[]>(`${API_URL}/users/${data.id}`);
  }
}
