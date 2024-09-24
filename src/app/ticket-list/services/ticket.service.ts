import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private httpClient: HttpClient) {}

  getTickets(): Promise<any[]> {
    return firstValueFrom(
      this.httpClient.get<any[]>('http://localhost:3000/tickets')
    );
  }
}
