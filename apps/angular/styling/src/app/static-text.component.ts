/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  standalone: true,
  imports: [TextComponent],
  template: `
    <text>This is a static text</text>
  `,
  styles: [
    `
      :host-context(.danger) {
        text {
          --text-color: red;
          --text-font-size: 30px;
        }
      }
      :host-context(.warning) {
        text {
          --text-color: orange;
          --text-font-size: 20px;
        }
      }
    `,
  ],
})
export class TextStaticComponent {}
