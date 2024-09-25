import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditTicketModalComponent } from '../../project/edit-ticket-modal/edit-ticket-modal.component';
import { ITicket } from '../models/ticket';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.less'],
})
export class TicketListComponent implements OnInit {
  public tickets: ITicket[] = [];
  public title: string;

  constructor(
    private ticketService: TicketService,
    private modalService: NzModalService,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      const filter = params.get('filter');
      this.filterTickets(filter);
    });
  }

  async filterTickets(filter: string): Promise<void> {
    this.tickets = await this.ticketService.getTickets();
    if (filter === 'today') {
      this.title = this.translateService.instant('tickets.title.today');
      this.tickets = this.tickets.filter(
        (ticket) =>
          new Date(ticket.dueDate).toDateString() === new Date().toDateString()
      );
    } else if (filter === '7-day') {
      this.title = this.translateService.instant('tickets.title.weekly');
      this.tickets = this.tickets.filter((ticket) => {
        const dueDate = new Date(ticket.dueDate);
        const today = new Date();
        const sevenDaysFromNow = new Date(today);
        sevenDaysFromNow.setDate(today.getDate() + 7);
        return dueDate >= today && dueDate <= sevenDaysFromNow;
      });
    } else if (filter === '30-day') {
      this.title = this.translateService.instant('tickets.title.monthly');
      this.tickets = this.tickets.filter((ticket) => {
        const dueDate = new Date(ticket.dueDate);
        const today = new Date();
        const thirtyDaysFromNow = new Date(today);
        thirtyDaysFromNow.setDate(today.getDate() + 30);
        return dueDate >= today && dueDate <= thirtyDaysFromNow;
      });
    } else {
      this.title = this.translateService.instant('tickets.title.all');
    }
  }

  openEditModal(ticket: ITicket): void {
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
