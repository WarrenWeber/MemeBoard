import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MemeBoard';

  constructor(private router: Router) {
  }

  search(event : any)
  {
    console.log(event);
    this.router.navigate([`search/${event.target.value}`]);
  }
}
