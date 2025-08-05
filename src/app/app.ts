import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('flavors-feast-pe');

  constructor(private router: Router) {}

  ngOnInit(): void {

    initFlowbite();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Esperar un poco para que los componentes se hayan renderizado
        setTimeout(() => {
          initFlowbite();
        }, 0);
      }
    });
  }
}
