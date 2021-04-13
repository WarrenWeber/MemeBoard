import { Component, OnInit } from '@angular/core';

import { MemeService } from '../meme.service';
import { Meme } from '../models/meme';
import {element} from 'protractor';

@Component({
  selector: 'app-collection-tag',
  templateUrl: './collection-tag.component.html',
  styleUrls: ['./collection-tag.component.css']
})
export class CollectionTagComponent implements OnInit {

  private memes: Meme[];
  private categories: string[];
  private errMsg: any;

  constructor(private memeService: MemeService) {
    this.categories = [];
    this.memes = [];
  }

  addMemes(memes: Meme[]): void {
    for (let i = 1; i < memes.length ; i++){ this.memes.push(memes[i]); }
  }

  ngOnInit(): void {
    this.memeService.getMemes().subscribe(result =>  this.addMemes(result),
      err =>  this.errMsg = <any> err,
      () => this.addCategories());
  }

  addCategories(): void{
    for (const meme of this.memes){
      if (meme.category != null){
        if (!this.categories.includes(meme.category) && meme.category != ""){
          this.categories.push(meme.category);
        }
      }
    }
    this.categories.push('random');
  }

  public getCategories(): string[]{
    return this.categories;
  }
}
