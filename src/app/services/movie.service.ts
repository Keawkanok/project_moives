import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '@ionic/angular';

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode',
}
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  url = 'http://www.omdbapi.com/';
  apiKey = 'fb04c238';

  constructor(private http: HttpClient) {}

  searchData(title: string, type: SearchType): Observable<HttpResponse<Config>> {
    return this.http
      .get<Config>(
        `${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`
      )
      .pipe(map((results) => results['Search']));
  }

  getDetails(id) {
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }
}
