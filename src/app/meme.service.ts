import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

import { Meme } from './models/meme';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  public DATA_SERVER_URL : string = environment.DATA_SERVER_URL;
  public MEDIA_SERVER_URL : string = environment.MEDIA_SERVER_URL;

  public getMemes(querystring: string): Observable<Meme[]> {
    return this.http.get<Meme[]>(`${environment.DATA_SERVER_URL}/memes?${querystring}`);
  }

  public getMemeByID(id?: number): Observable<Meme> {
    return this.http.get<Meme>(`${environment.DATA_SERVER_URL}/memes/${id}`);
  }

  public deleteMeme(id?: number): Observable<Meme> {
    return this.http.delete<Meme>(`${environment.DATA_SERVER_URL}/memes/${id}`);
  }

  public postMeme(meme: Meme): Observable<Meme> {
    return this.http.post<Meme>(`${environment.DATA_SERVER_URL}/memes`, meme);
  }

  public patchMeme(meme? : Meme) : Observable<Meme> {
    return this.http.patch<Meme>(`${environment.DATA_SERVER_URL}/memes/${meme?.id}`, meme);
  }

  public getCategories() : Observable<string[]> {
    return this.http.get<string[]>(`${environment.DATA_SERVER_URL}/categories`);
  }

  public postImage(file : File) : Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${environment.MEDIA_SERVER_URL}/upload.php`, formData, {reportProgress: true, observe: 'events'});
  }

  constructor(private http: HttpClient) { }



}
