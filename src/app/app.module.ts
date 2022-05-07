import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteListComponent } from './pages/note-list/note-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteCardsComponent } from './note-cards/note-cards.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    MainLayoutComponent,
    NoteCardsComponent,
    NoteDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
