import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { ITicket } from '../../ticket-list/models/ticket';
import { TicketService } from '../../ticket-list/services/ticket.service';
import { dueDateValidator } from '../validators/date.validators';

@Component({
  selector: 'app-edit-ticket-modal',
  templateUrl: './edit-ticket-modal.component.html',
  styleUrls: ['./edit-ticket-modal.component.less'],
})
export class EditTicketModalComponent implements OnInit {
  ticket: ITicket;
  editTicketForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private ticketService: TicketService,
    @Inject(NZ_MODAL_DATA) public modalData: { ticket: ITicket } // Inject modal data
  ) {}

  ngOnInit(): void {
    this.ticket = this.modalData.ticket;
    this.editTicketForm = this.fb.group({
      title: [this.ticket.title, [Validators.required]],
      description: [this.ticket.description, [Validators.required]],
      dueDate: [this.ticket.dueDate, [Validators.required, dueDateValidator]],
      status: [this.ticket.status, [Validators.required]],
      subtasks: [this.ticket.subtasks],
    });
  }

  submitForm(): void {
    if (this.editTicketForm.invalid) return;

    const updatedTicket: ITicket = {
      ...this.ticket,
      ...this.editTicketForm.value,
    };

    this.ticketService.updateTicket(updatedTicket).subscribe(
      () => {
        this.modal.close(updatedTicket);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du ticket:', error);
      }
    );
  }

  closeModal(): void {
    this.modal.destroy();
  }
}
