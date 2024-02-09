import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLinkWithHref } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { debounceTime, distinctUntilChanged, skipWhile, tap } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoStore } from './photos.store';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    NgIf,
    NgFor,
    MatInputModule,
    LetDirective,
    RouterLinkWithHref,
  ],
  templateUrl: './photos.component.html',
  providers: [provideComponentStore(PhotoStore)],
  host: {
    class: 'p-5 block',
  },
})
export default class PhotosComponent implements OnInit {
  store = inject(PhotoStore);
  readonly vm$ = this.store.vm$.pipe(
    tap(({ search }) => {
      if (!this.formInit) {
        this.search.setValue(search);
        this.formInit = true;
      }
    }),
  );

  private formInit = false;
  search = new FormControl();

  ngOnInit(): void {
    this.store.search(
      this.search.valueChanges.pipe(
        skipWhile(() => !this.formInit),
        debounceTime(300),
        distinctUntilChanged(),
      ),
    );
  }

  trackById(index: number, photo: Photo) {
    return photo.id;
  }

  encode(photo: Photo) {
    return encodeURIComponent(JSON.stringify(photo));
  }
}
