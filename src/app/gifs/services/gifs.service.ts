import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = 'WlxOmZkXbYPxKhChgMoP2IUBNQOqTC20';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    // lo que hace es parsear el string a formato JSON
    // el signo ! hace que typescript confie en lo que va a traer, tipo el any
    // si trae null, muestra un array vacío
    // La de abajo es otra forma de hacer lo mismo
    /*if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }*/
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    // solo si no está incluido en el array lo pushea
    if (!this._historial.includes(query)) {
      this._historial.unshift(query); // unshift pushea al inicio del array
      this._historial = this._historial.splice(0, 10); // solo muestra 10

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    // en lugar de un fetch o un async-await
    // hacemos este import en el app.module.ts
    // import { HttpClientModule } from '@angular/common/http';
    // y agregamos el module en el import de abajo..
    // también importamos HttpClient en los imports de este mismo archivo
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=15`)
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      });

  }
}
