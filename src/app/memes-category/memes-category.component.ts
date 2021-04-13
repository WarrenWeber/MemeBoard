import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MemeService } from '../meme.service';

import { Meme } from '../models/meme';

@Component({
  selector: 'app-memes-category',
  templateUrl: './memes-category.component.html',
  styleUrls: ['./memes-category.component.css']
})
export class MemesCategoryComponent implements OnInit {
  private _memes: Meme[];
  private nbMeme = 0;
  private nbMemeByLoad = 5;
  private category: string;

  constructor(private memeService: MemeService, private route: ActivatedRoute) {
    this._memes = [];
    this.category = '';
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.category = String(routeParams.get('category'));
    this.memeService.getMemesByStartEndByCategory(0, this.nbMemeByLoad, this.category).subscribe(result => this._memes = result);
    this.nbMeme = this.nbMemeByLoad;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      this.loadMore();
    }
  }

  addMemes(memes: Meme[]): void {
    for (let i = 1; i < memes.length ; i++){ this._memes.push(memes[i]); }
  }

  loadMore(): void {
    console.log('load more');
    this.memeService.getMemesByStartEndByCategory(this.nbMeme, this.nbMeme + this.nbMemeByLoad,
      this.category).subscribe(result => { this.addMemes(result); });
    this.nbMeme = this.nbMeme + this.nbMemeByLoad;
  }

  memes(): Meme[] {
    return this._memes;
  }

}
