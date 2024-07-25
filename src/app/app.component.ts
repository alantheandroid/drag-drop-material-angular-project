import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserInterface } from './user.interface';
import { data } from './data';
import { CommonModule } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
})
export class AppComponent {
  users: UserInterface[] = data;
  drop(event: CdkDragDrop<UserInterface[]>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
  addUser() {
    this.users.push({
      name: '',
      id: Math.max(...this.users.map((user) => user.id)) + 1,
    });
  }
  removeUser({ id }: UserInterface) {
    this.users = this.users.filter((user) => user.id !== id);
  }
  resizeElement(event: MouseEvent, element: HTMLElement): void {
    const initialWidth = element.offsetWidth;
    const initialX = event.clientX;
    const mouseMove = (moveEvent: MouseEvent): void => {
      element.style.width = `${initialWidth + moveEvent.clientX - initialX}px`;
    };
    const mouseUp = (): void => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  }
}
