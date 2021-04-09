import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';

import { MemeService } from '../meme.service'

import { Meme } from '../models/meme';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit {
  private _memes : Meme[];
  private nbMeme : number = 0;
  private nbMemeByLoad : number = 5;
  //private _memes : Meme[];

  constructor(private memeService: MemeService) {
    //this._memes = of();
    this._memes = [];
  }

  ngOnInit(): void {
    this.memeService.getMemesByStartEnd(0, this.nbMemeByLoad).subscribe(result => this._memes = result);
    this.nbMeme = this.nbMemeByLoad;
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      this.loadMore();
    }
  }

  addMemes(memes: Meme[]): void {
    for(var i = 1; i < memes.length ; i++){ this._memes.push(memes[i]); }
  }

  loadMore(): void {
    console.log("load more");
    this.memeService.getMemesByStartEnd(this.nbMeme, this.nbMeme+this.nbMemeByLoad).subscribe(result => { this.addMemes(result); });
    this.nbMeme = this.nbMeme + this.nbMemeByLoad;
  }

  memes() {
    return this._memes;
  }

}
