import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMER = new InjectionToken<number>('DEFAULT_TIMER');

export const getDefaultTimerProvider = (value?: number) => ({
  provide: DEFAULT_TIMER,
  useValue: value ?? 1000,
});
