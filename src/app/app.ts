import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileCard } from './profile-card/profile-card';

@Component({
  selector: 'app-root',
  imports: [ FormsModule, ProfileCard],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('profile-card-app');
}
