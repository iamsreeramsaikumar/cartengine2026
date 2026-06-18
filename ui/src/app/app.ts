import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { Toaster } from './core/components/toaster/toaster';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Toaster],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CartEngine');
}
