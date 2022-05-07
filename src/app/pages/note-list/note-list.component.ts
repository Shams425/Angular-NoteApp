import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { NotesService } from 'src/app/Shared/notes.service';
import { NoteData } from '../../Shared/noteModel.model';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
  animations: [
    trigger('itemAnimate', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        animate(
          '50ms',
          style({
            display: 'block',
            height: '*',
            'margin-bottom': '*',
            paddingTop: '*',
            paddingBottom: '*',
            paddingRight: '*',
            paddingLeft: '*',
          })
        ),
        animate(70),
      ]),

      transition('* => void', [
        animate(
          50,
          style({
            display: 'block',
            transform: 'scale(1.05)',
          })
        ),
        animate(
          50,
          style({
            display: 'block',
            transform: 'scale(1)',
            opacity: 0.75,
          })
        ),
        animate(
          '120ms ease-out',
          style({
            display: 'block',
            transform: 'scale(0.7)',
            opacity: 0,
          })
        ),
        animate(
          '150ms ease-out',
          style({
            display: 'block',
            height: 0,
            opacity: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
            'margin-bottom': 0,
          })
        ),
      ]),
    ]),
    trigger('listAnimate', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              height: 0,
            }),
            stagger(100, [animate('0.2s ease')]),
          ],
          {
            optional: true,
          }
        ),
      ]),
    ]),
  ],
})
export class NoteListComponent implements OnInit {
  constructor(private noteServices: NotesService) {}
  notes: NoteData[] = new Array<NoteData>();
  filteredNotes: NoteData[] = new Array<NoteData>();

  @ViewChild('filterInput') filterInputElemRef: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.notes = this.noteServices.getAll();

    // we call the filter function with empty string to prevent the effect of remove add and then remove again in the note array
    this.filterNotes(' ');
  }

  deleteNote(note: NoteData) {
    let noteId = this.noteServices.getId(note);
    console.log(noteId);
    this.noteServices.delete(noteId);
    this.filterNotes(this.filterInputElemRef.nativeElement.value);
  }

  filterNotes(query: string) {
    query = query.toLowerCase().trim();

    //split the search bar words
    let allResults: NoteData[] = new Array<NoteData>();
    let terms: string[] = query.split(' ');

    terms = this.removeDuplicates(terms);

    //compile all relevant results into the all results array
    terms.forEach((term) => {
      let results: NoteData[] = this.relevantResults(term);
      //append results to the allResults array
      allResults = [...allResults, ...results];
    });

    // allResults will include the duplicate notes so we need to remove it
    // after that sort the results according to the most relevant
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

    this.sortByRelevancy(allResults);
    return allResults;
  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();

    //add item to the array and item to the set
    arr.forEach((elm) => uniqueResults.add(elm));

    return Array.from(uniqueResults);
  }

  relevantResults(query: string): Array<NoteData> {
    query.toLowerCase().trim();

    let relevantNotes = this.notes.filter((note) => {
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }
      if (note.body && note.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });
    return relevantNotes;
  }

  //the method will calculate the relevant of a note based on the number of times it appears in search results
  sortByRelevancy(searchResults: NoteData[]) {
    let noteCountObj: any = {}; // the object format will be { NoteId: note object count}

    searchResults.forEach((note) => {
      let noteId = this.noteServices.getId(note);

      if (noteCountObj[noteId]) {
        noteCountObj[noteId] += 1;
      } else {
        noteCountObj[noteId] = 1;
      }
    });

    this.filteredNotes = this.filteredNotes.sort((a: NoteData, b: NoteData) => {
      let aId = this.noteServices.getId(a);
      let bId = this.noteServices.getId(b);

      let aCount = noteCountObj[aId];
      let bCount = noteCountObj[bId];

      return bCount - aCount;
    });
  }

  generatedNoteURL(note: NoteData) {
    let noteId = this.noteServices.getId(note);

    return noteId;
  }
}
