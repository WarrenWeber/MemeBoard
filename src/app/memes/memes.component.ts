import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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

  private category : string = '';
  private tag : string = '';
  private search : string = '';

  public loading : boolean = false;

  constructor(private memeService: MemeService, private route: ActivatedRoute) {
    this._memes = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params["category"] || '';
      this.tag = params["tag"] || '';
      this.search = params["search"] || '';

      this._memes = [];
      this.loadMore();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (document.documentElement.clientHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      this.loadMore();
    }
  }

  setSortMethod(event : any)
  {
    let val = event.target.value;
    this.sort = val;
    this._memes = [];
    this.loadMore();
  }

  loadMore(): void {
    this.loading = true;

    let queryString = this.getBaseQueryString() + `&_page=1&_limit=${this.limit}`;

    let lastSortAttribute = this.getLastSortAttribute();

    if (this._memes.length > 0) {
      queryString += `&id_gte=${this._memes[this._memes.length - 1].id}&id_ne=${this._memes[this._memes.length - 1].id}`;

      if(lastSortAttribute != undefined)
        queryString += `&${this.sort}=${lastSortAttribute}`;
    }

    this.memeService.getMemes(queryString).subscribe(
      (result) => {
        if (result.length == this.limit || this._memes.length == 0)
        {
          Array.prototype.push.apply(this._memes, result);
          this.loading = false;
        }
        else
        {
          let queryString2 = this.getBaseQueryString() + `&_page=1&_limit=${this.limit - result.length}`;

          if (lastSortAttribute != undefined) {
            queryString2 += `&${this.sort}_${this.sort_order == 'desc' ? "lte" : "gte"}=${lastSortAttribute}&${this.sort}_ne=${lastSortAttribute}`;
          }

          this.memeService.getMemes(queryString2).subscribe(
            (result2) => {
              Array.prototype.push.apply(result, result2);
              Array.prototype.push.apply(this._memes, result);
              this.loading = false;
            },
            (error) => {
              this.loading = false;
            }
          );
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getBaseQueryString() : string {
    return this.getSort() + this.getOrder() + this.getCategoryFilter() + this.getTagFilter() + this.getSearchFilter();
  }

  getCategoryFilter() : string {
    return this.category != '' ? `&category=${this.category}` : '';
  }

  getTagFilter() : string {
    return this.tag != '' ? `&tags_like=${this.tag}` : '';
  }

  getSearchFilter() : string {
    return this.search != '' ? `&title_like=${this.search}` : '';
  }

  getSort(): string {
    return `&_sort=${this.sort},id`;
  }

  getOrder(): string {
    return `&_order=${this.sort_order},asc`;
  }

  getLastSortAttribute() {
    let lastSortAttribute = undefined;
    if (this._memes.length > 0) {
      switch(this.sort) {
        case 'date':  lastSortAttribute = `${this._memes[this._memes.length - 1]?.date}`;    break;
        case 'votes': lastSortAttribute = `${this._memes[this._memes.length - 1]?.votes}`;   break;
      }
    }
    return lastSortAttribute;
  }

  memes(): Meme[] {
    return this._memes;
  }

}
