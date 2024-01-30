import { NgIf } from '@angular/common';
import {
  Directive,
  Input,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  selector: '[hasRole], [hasRoleAdmin]',
  standalone: true,
  hostDirectives: [NgIf],
})
export class HasRoleDirective implements OnInit {
  private store = inject(UserStore);
  private ngIf = inject(NgIf);

  private readonly _isAdmin = signal<boolean>(false);
  private readonly _role = signal<Role | Role[] | undefined>(undefined);

  private readonly showTemplate = signal<boolean>(false);

  @Input('hasRole') set role(role: Role | Role[] | undefined) {
    this._role.set(role);
  }

  @Input('hasRoleAdmin') set isAdmin(isAdmin: boolean) {
    this._isAdmin.set(isAdmin);
  }

  constructor() {
    effect(() => {
      this.ngIf.ngIf = this.showTemplate();
    });
  }

  ngOnInit() {
    if (this._isAdmin()) {
      this.store.user$.subscribe((user) => {
        this.showTemplate.set(user?.isAdmin ?? false);
      });
    } else {
      this.store.user$.subscribe((user) => {
        const hasRole = this.store.hasRole(this._role(), user);
        this.showTemplate.set(hasRole);
      });
    }
  }
}
