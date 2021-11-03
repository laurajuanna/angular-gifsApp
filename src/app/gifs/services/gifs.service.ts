import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey: string = 'WlxOmZkXbYPxKhChgMoP2IUBNQOqTC20';
  private _historial: string[] = [];

  // TODO: Cambiar any por su tipo correspondiente
  public resultados: any[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) { }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    // solo si no está incluido en el array lo pushea
    if (!this._historial.includes(query)) {
      this._historial.unshift(query); // unshift pushea al inicio del array
      this._historial = this._historial.splice(0, 10); // solo muestra 10
    }

    // en lugar de un fetch o un async-await
    // hacemos este import en el app.module.ts
    // import { HttpClientModule } from '@angular/common/http';
    // y agregamos el module en el import de abajo..
    // también importamos HttpClient en los imports de este mismo archivo
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=15`)
      .subscribe((resp: any) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });

  }
}
