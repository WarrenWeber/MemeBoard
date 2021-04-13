import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Meme } from './models/meme';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  /*public getMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>("http://localhost:3000/memes?_sort=date&_order=desc");
  }*/

  public getMemes(querystring: string): Observable<Meme[]> {
    return this.http.get<Meme[]>("http://localhost:3000/memes?" + querystring);
  }

  public getMemesByStartEnd(start: number, end: number): Observable<Meme[]> {
    return this.http.get<Meme[]>(`http://localhost:3000/memes?_sort=date&_order=desc&_start=${start}&_end=${end}`);
  }

  public getMemeByID(id?: number): Observable<Meme> {
    return this.http.get<Meme>(`http://localhost:3000/memes/${id}`);
  }

  public deleteMeme(id?: number): Observable<Meme> {
    return this.http.delete<Meme>(`http://localhost:3000/memes/${id}`);
  }

  public postMeme(meme: Meme) : Observable<Meme> {
    return this.http.post<Meme>("http://localhost:3000/memes", meme);
  }

  constructor(private http : HttpClient) { }


}
