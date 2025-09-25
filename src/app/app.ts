import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Home} from './pages/home/home';
import {UserService} from './core/services/UserService';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('music-app');

  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.userService.loadUser();
  }
}
