import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITicket } from '../models/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:3000/tickets';

  constructor(private http: HttpClient) {}

  createTicket(ticket: ITicket): Observable<ITicket> {
    return this.http.post<ITicket>(this.apiUrl, ticket);
  }

  getTicketById(id: number): Observable<ITicket> {
    return this.http.get<ITicket>(`${this.apiUrl}/${id}`);
  }

  updateTicket(ticket: ITicket): Observable<ITicket> {
    return this.http.put<ITicket>(`${this.apiUrl}/${ticket.id}`, ticket);
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  saveTicketId(id: number): void {
    localStorage.setItem('ticketId', id.toString());
  }

  getSavedTicketId(): number | null {
    const id = localStorage.getItem('ticketId');
    return id ? parseInt(id, 10) : null;
  }

  getSavedTicketInfo(): Observable<ITicket> | null {
    const id = this.getSavedTicketId();
    return id ? this.getTicketById(id) : null;
  }
}
