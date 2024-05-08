import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WordStatus } from '../../../shared/model/matching-game-model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-word',
  standalone: true,
  imports: [MatCardModule,
    CommonModule,
  ],
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordComponent {
  @Input() value?: string;
  color: string = 'black'; // Default color
  @Input() wordStatus?: WordStatus;

  constructor() {}

  ngOnChanges(): void {
    this.setColor();
  }

  private setColor(): void {
    switch (this.wordStatus) {
      case WordStatus.NORMAL:
        this.color = 'black';
        break;
      case WordStatus.SELECTED:
        this.color = 'blue';
        break;
      case WordStatus.DISABLED:
        this.color = 'gray';
        break;
      default:
        this.color = 'black'; // Set default color if status is undefined
        break;
    }
  }
}
