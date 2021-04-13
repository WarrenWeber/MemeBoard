import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';

import { MemeService } from '../meme.service';

import { Meme } from '../models/meme';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.css']
})
export class MemesComponent implements OnInit {
  private _memes: Meme[];

  private page = 1;
  private start = 0;
  private limit = 5;

  private sort = 'date';
  private sort_order = 'desc';

  constructor(private memeService: MemeService) {
    // this._memes = of();
    this._memes = [];
  }

  ngOnInit(): void {
    this.loadMore();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      this.loadMore();
    }
  }

  loadMore(): void {
    let queryString = this.getSort() + '&' + this.getOrder() + `&_page=1&_limit=${this.limit}`;

    if (this._memes.length > 0) {
      queryString += `&date=${this._memes[this._memes.length - 1]?.date}&id_gte=${this._memes[this._memes.length - 1].id}&id_ne=${this._memes[this._memes.length - 1].id}`;
    }

    this.memeService.getMemes(queryString).subscribe(result => {
      if (result.length == this.limit)
      {
        Array.prototype.push.apply(this._memes, result);
      }
      else
      {
        let queryString2 = this.getSort() + '&' + this.getOrder() + `&_page=1&_limit=${this.limit - result.length}`;

        if (result.length > 0) {
          queryString2 += `&date_lte=${result[result.length - 1]?.date}&date_ne=${result[result.length - 1]?.date}`;
        }

        this.memeService.getMemes(queryString2).subscribe(result2 => {
          Array.prototype.push.apply(result, result2);
          Array.prototype.push.apply(this._memes, result);
        });
      }
    });
  }

  getSort(): string {
    return `_sort=${this.sort},id`;
  }

  getOrder(): string {
    return `_order=${this.sort_order},asc`;
  }

  memes(): Meme[] {
    return this._memes;
  }

}
