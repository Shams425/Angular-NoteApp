import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
import { NoteListComponent } from './pages/note-list/note-list.component';

const routes: Routes = [
  {path: "", component: MainLayoutComponent, children: [
    {path: "", component: NoteListComponent},
    {path: "new", component:NoteDetailsComponent},
    {path: ":id", component:NoteDetailsComponent},
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
