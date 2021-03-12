import { Component, OnInit } from '@angular/core';

import { MovieService, SearchType } from './../../services/movie.service';
import { Observable } from 'rxjs';

import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  results: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;
  constructor(
    private movieService: MovieService,
    private menu: MenuController
  ) {}

  ngOnInit() {}

  searchChanged() {
    // Call our service function which returns an Observable
    this.results = this.movieService.searchData(this.searchTerm, this.type);
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
