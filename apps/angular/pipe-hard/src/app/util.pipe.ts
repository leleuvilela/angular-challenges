import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

type TypeOfPersonUtils = typeof PersonUtils;
type KeysOfPersonUtils = keyof TypeOfPersonUtils;
type ValuesOfPersonUtils = TypeOfPersonUtils[KeysOfPersonUtils];
type ParamsOfPersonUtils = Parameters<ValuesOfPersonUtils>;

@Pipe({
  name: 'util',
  standalone: true,
})
export class UtilPipe implements PipeTransform {
  transform(value: KeysOfPersonUtils, ...args: ParamsOfPersonUtils) {
    const util = PersonUtils[value] as (
      ...args: ParamsOfPersonUtils
    ) => ReturnType<ValuesOfPersonUtils>;

    return util(...args);
  }
}
