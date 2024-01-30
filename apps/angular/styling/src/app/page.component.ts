/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'page',
  standalone: true,
  imports: [TextStaticComponent, TextComponent],
  template: `
    <static-text></static-text>
    <static-text class="danger"></static-text>
    <static-text class="warning"></static-text>
    <text>This is a blue text</text>
  `,
  styles: [
    `
      text {
        --text-color: blue;
        --text-font-size: 15px;
      }
    `,
  ],
})
export class PageComponent {}
