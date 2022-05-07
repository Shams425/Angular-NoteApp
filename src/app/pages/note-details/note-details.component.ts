import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NoteData } from 'src/app/Shared/noteModel.model';
import { NotesService } from 'src/app/Shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  NoteDetails: FormGroup;
  noteData: NoteData;

  noteId: number;
  new: boolean;

  constructor(
    private formBuild: FormBuilder,
    private noteServices: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.noteData = new NoteData();
      if (params['id']) {
        this.noteData = this.noteServices.get(params['id']);
        this.noteId = params['id'];
        this.new = false;
      } else {
        this.new = true;
      }
    });

    this.NoteDetails = this.formBuild.group({
      title: [this.noteData.title, Validators.required],
      body: [this.noteData.body, Validators.required],
    });
  }

  onSubmit() {
    if (this.new) {
      this.noteServices.add(this.NoteDetails.value);
      this.NoteDetails.reset();
    } else {
      this.noteServices.update(
        this.noteId,
        this.NoteDetails.value.title,
        this.NoteDetails.value.body
      );
    }
    this.router.navigateByUrl('/');
  }

  cancel() {
    this.NoteDetails.reset();
    this.router.navigateByUrl('/');
  }
}
