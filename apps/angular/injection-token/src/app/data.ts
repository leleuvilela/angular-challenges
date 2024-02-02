import { InjectionToken } from '@angular/core';

export const TIMER = new InjectionToken<number>('TIMER');

export const getDefaultTimerProvider = (value?: number) => ({
  provide: TIMER,
  useValue: value ?? 1000,
});
