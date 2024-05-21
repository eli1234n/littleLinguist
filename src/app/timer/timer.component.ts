import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit, OnDestroy{
  ngOnDestroy(): void {
    this.stopTimer(); 
  }
  private timer?: any;

  @Output()
  reportTimeLeft = new EventEmitter<number>();

  @Input()
  totalDuration = 0;

  currentDuration = 0;

  ngOnInit(): void {
    this.currentDuration = this.totalDuration;
    this.timer = setInterval(() => this.changeDuration(), 1000);
  }
  changeDuration() {
    --this.currentDuration;
    this.reportTimeLeft.emit(this.currentDuration)
    if(
      this.currentDuration == 0
    ){
      this.stopTimer();
    }
    console.log("time time time" + this.currentDuration)
  }

  stopTimer(){
    clearInterval(this.timer);

  }
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = Math.floor(value % 60);
    const minutesStr: string = minutes < 10 ? '0' + minutes : '' + minutes;
    const secondsStr: string = seconds < 10 ? '0' + seconds : '' + seconds;
    return `${minutesStr}:${secondsStr}`;
}}
