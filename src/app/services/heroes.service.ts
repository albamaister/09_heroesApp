import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeMdel } from '../models/heroe.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesapp-34bcf.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeMdel) {
    return this.http.post(`${this.url}/Heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }
}
