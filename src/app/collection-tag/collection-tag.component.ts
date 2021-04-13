import { Component, OnInit } from '@angular/core';
import { MemeService } from '../meme.service';

@Component({
  selector: 'app-collection-tag',
  templateUrl: './collection-tag.component.html',
  styleUrls: ['./collection-tag.component.css']
})
export class CollectionTagComponent implements OnInit {

  categories: string[];

  constructor(private memeService: MemeService) {
    this.categories = [];
  }

  ngOnInit(): void {
    this.memeService.getCategories().subscribe(result => {
      this.categories = result.sort();
    });
  }
}
