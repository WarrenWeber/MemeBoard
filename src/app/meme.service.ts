import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Meme } from './models/meme';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  /*public getMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>("http://localhost:3000/memes?_sort=date&_order=desc");
  }*/

  public getMemes(querystring: string): Observable<Meme[]> {
    return this.http.get<Meme[]>('http://localhost:3000/memes?' + querystring);
  }

  public getMemeByID(id?: number): Observable<Meme> {
    return this.http.get<Meme>(`http://localhost:3000/memes/${id}`);
  }

  public deleteMeme(id?: number): Observable<Meme> {
    return this.http.delete<Meme>(`http://localhost:3000/memes/${id}`);
  }

  public postMeme(meme: Meme): Observable<Meme> {
    return this.http.post<Meme>('http://localhost:3000/memes', meme);
  }

  public patchMeme(meme? : Meme) : Observable<Meme> {
    return this.http.patch<Meme>(`http://localhost:3000/memes/${meme?.id}`, meme);
  }

  public getCategories() : Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/categories');
  }

  constructor(private http: HttpClient) { }



}
