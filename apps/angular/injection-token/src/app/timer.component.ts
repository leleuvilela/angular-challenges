import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { TIMER } from './data';

@Component({
  selector: 'timer',
  standalone: true,
  template: `
    Timer running {{ timer() }}
  `,
})
export class TimerComponent {
  interval = inject(TIMER);

  timer = toSignal(interval(this.interval));

  constructor() {
    if (!this.interval) {
      throw new Error('TimerComponent requires a TIMER token');
    }
  }
}
