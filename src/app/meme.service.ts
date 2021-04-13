import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Meme } from './models/meme';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  /*public getMemes(): Meme[] {
    return [
      { id: 1, title: 'Anarchy', file: 'left.png' },
      { id: 2, title: 'Doggo', file: '1a427b0e8906ad3be85fa028e61e4f16769c20e2.jpg' }
    ];
  }*/

  public getMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>('http://localhost:3000/memes?_sort=id&_order=desc');
  }

  public getMemesByStartEnd(start: number, end: number): Observable<Meme[]> {
    return this.http.get<Meme[]>(`http://localhost:3000/memes?_sort=id&_order=desc&_start=${start}&_end=${end}`);
  }

  public getMemesByStartEndByCategory(start: number, end: number, category: string): Observable<Meme[]> {
    return this.http.get<Meme[]>(`http://localhost:3000/memes?_sort=id&_order=desc&_start=${start}&_end=${end}&category=${category}`);
  }

  public getMemeByID(id?: number): Observable<Meme> {
    return this.http.get<Meme>(`http://localhost:3000/memes/${id}`);
  }

  public deleteMeme(id?: number): Observable<Meme> {
    return this.http.delete<Meme>(`http://localhost:3000/memes/${id}`);
  }

  constructor(private http: HttpClient) { }


}
