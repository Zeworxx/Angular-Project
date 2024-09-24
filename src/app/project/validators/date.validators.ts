import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dueDateValidator(control: AbstractControl): ValidationErrors | null {
  const dueDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 1);

  return dueDate >= minDate ? null : { dueDateInvalid: true };
}