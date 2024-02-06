import { Directive, Input } from '@angular/core';

interface ListTemplateContext<T> {
  $implicit: T[];
  appList: T[];
  index: number;
}

@Directive({
  selector: 'ng-template[appList]',
  standalone: true,
})
export class ListTemplateDirective<T> {
  @Input('appList') list!: T[];

  static ngTemplateContextGuard<TContext>(
    dir: ListTemplateDirective<TContext>,
    ctx: unknown,
  ): ctx is ListTemplateContext<TContext> {
    return true;
  }
}
