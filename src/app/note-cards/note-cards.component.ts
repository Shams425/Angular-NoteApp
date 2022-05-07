import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-note-cards',
  templateUrl: './note-cards.component.html',
  styleUrls: ['./note-cards.component.scss'],
})
export class NoteCardsComponent {
  @Input() title: string;
  @Input() body: string;
  @Input() link: any;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter();

  @ViewChild('gradientText') gradientText: ElementRef<HTMLElement>;
  @ViewChild('bodyText') text: ElementRef<HTMLElement>;
  @ViewChild('noteContainer') cardContainer: ElementRef<HTMLElement>;

  constructor(private render: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let style = window.getComputedStyle(this.text.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue('height'), 10);

    // hide the gradient effect when there is a short text
    if (this.text.nativeElement.scrollHeight > viewableHeight) {
      this.render.setStyle(this.gradientText.nativeElement, 'display', 'block');
    }

    // show the gradient effect when there is a large text
    else {
      this.render.setStyle(this.gradientText.nativeElement, 'display', 'none');
    }
  }

  DeleteNote() {
    this.cardContainer.nativeElement.classList.add('animation');
    console.log(this.cardContainer.nativeElement.classList);
    this.deleteEvent.emit();
  }
}
