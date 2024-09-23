import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.less'],
})
export class CreateTicketComponent implements OnInit {
  ticketForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('en attente', [Validators.required]),
      subtasks: this.fb.array([]),
    });
  }

  get subtasks() {
    return this.ticketForm.get('subtasks') as FormArray;
  }

  addSubtask() {
    this.subtasks.push(
      this.fb.group({
        title: new FormControl('', [Validators.required]),
      })
    );
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  submitForm() {
    if (this.ticketForm.invalid) return;
    console.log(this.ticketForm.value);
  }
}
