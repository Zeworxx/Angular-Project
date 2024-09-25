import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ITicket } from '../../project/create-ticket/models/ticket';
import { EditTicketModalComponent } from '../../project/edit-ticket-modal/edit-ticket-modal.component';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.less'],
})
export class TicketListComponent implements OnInit {
  public tickets: ITicket[] = [];

  constructor(
    private ticketService: TicketService,
    private modalService: NzModalService
  ) {}

  async ngOnInit(): Promise<void> {
    this.tickets = await this.ticketService.getTickets();
  }

  openEditModal(ticket: ITicket): void {
    console.log('Ticket passed to openEditModal:', ticket);
    if (!ticket) {
      console.error('Ticket is undefined');
      return;
    }

    const modal = this.modalService.create({
      nzContent: EditTicketModalComponent,
      nzData: { ticket },
      nzFooter: null,
    });

    modal.afterClose.subscribe((updatedTicket: ITicket) => {
      if (updatedTicket) {
        const index = this.tickets.findIndex((t) => t.id === updatedTicket.id);
        if (index !== -1) {
          this.tickets[index] = updatedTicket;
        }
      }
    });
  }
}