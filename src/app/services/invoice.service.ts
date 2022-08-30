import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';
const baseUrl = 'http://localhost:8080/api/invoices';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private http: HttpClient) { }

  getAll(clientNames: string[]): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${baseUrl}?clientNames=${clientNames}`);
  }

  get(id: any): Observable<Invoice> {
    return this.http.get(`${baseUrl}/${id}`);
  }
}