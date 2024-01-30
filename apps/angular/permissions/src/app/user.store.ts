import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.user.asObservable();

  add(user: User) {
    this.user.next(user);

    console.log(this.user.value);
  }

  hasRole(role: Role | Role[] | undefined, user?: User): boolean {
    if (!role) {
      return false;
    }

    if (user?.isAdmin) {
      return true;
    }

    const roles = Array.isArray(role) ? role : [role];

    return roles.some((role) => user?.roles.includes(role));
  }

  isUserAdmin(): boolean {
    return this.user.value?.isAdmin ?? false;
  }

  hasUserRole(role: Role | Role[] | undefined): boolean {
    return this.hasRole(role, this.user.value);
  }
}
