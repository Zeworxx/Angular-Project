import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.less'],
})
export class TicketListComponent implements OnInit {
  public tickets = [];

  constructor(private ticketService: TicketService) {}

  async ngOnInit(): Promise<void> {
    this.tickets = await this.ticketService.getTickets();
  }
}
