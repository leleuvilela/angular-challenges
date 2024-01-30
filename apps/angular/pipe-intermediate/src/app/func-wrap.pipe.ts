import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'funcWrap',
  standalone: true,
})
export class FuncWrapPipe implements PipeTransform {
  transform<Fn extends (...args: never[]) => ReturnType<Fn>>(
    fn: Fn,
    ...args: Parameters<Fn>
  ) {
    return fn(...args);
  }
}
