import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysRemaining'
})
export class DaysRemaining implements PipeTransform {

  transform(endDate: Date): string {
    const now = new Date();
    const end = new Date(endDate);
    const daysRemaining = Math.ceil(Math.abs(end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return daysRemaining > 0 ? `${daysRemaining} jour(s) restant(s)` : 'Échéance dépassée';
  }
}