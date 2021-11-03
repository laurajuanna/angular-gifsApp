import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    // solo si no está incluido en el array lo pushea
    if (!this._historial.includes(query)) {
      this._historial.unshift(query); // unshift pushea al inicio del array
      this._historial = this._historial.splice(0, 10); // solo muestra 10
    }

    console.log(this._historial);

  }
}
