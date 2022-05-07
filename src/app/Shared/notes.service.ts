import { Injectable } from '@angular/core';
import { NoteData } from '../Shared/noteModel.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes: NoteData[] = new Array<NoteData>();

  constructor() {}

  getAll() {
    return this.notes;
  }

  get(id: number) {
    return this.notes[id];
  }

  getId(note: NoteData) {
    return this.notes.indexOf(note);
  }

  add(note: NoteData) {
    let newItem = this.notes.push(note);
    let index = newItem - 1;

    return index;
  }

  update(id: number, title: string, body: string) {
    this.notes[id].title = title;
    this.notes[id].body = body;
    console.log(this.notes);
  }

  delete(id: number) {
    this.notes.splice(id, 1);
  }
}
