import { Component, OnInit } from '@angular/core';
import { MemeService } from '../meme.service';
import { Observable } from 'rxjs'
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-collection-tag',
  templateUrl: './collection-tag.component.html',
  styleUrls: ['./collection-tag.component.css']
})
export class CollectionTagComponent implements OnInit {

  categories$: Observable<string[]>;
  categories: string[] = [];

  constructor(private memeService: MemeService) {
    this.categories$ = this.memeService.getCategories().pipe(shareReplay(1));
  }

  ngOnInit(): void {
    this.categories$.subscribe(data => {this.categories = data});
  }
}
