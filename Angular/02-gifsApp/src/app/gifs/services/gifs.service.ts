import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = []

  get historial() {
    return [...this._historial]
  }

  private apiKeyGiphy: string =  'uCP4hsdj95il9vgU2C89D6OR1oQBcryP'

  // TODO: Cambiar Tipado
  public resultados: any[] = []

  constructor (private http: HttpClient) {}

  buscarGifs(query: string) {
    query = query.trim().toLowerCase()
    if (query.trim().length === 0) { return }
    if (this._historial.includes(query)) { return }
    this._historial.unshift(query)
    this._historial = this._historial.slice(0, 9)

    this.http.get(`http://api.giphy.com/v1/gifs/search?api_key=${this.apiKeyGiphy}&q=${query}&limit=10`)
      .subscribe((resp: any) => {
        this.resultados = resp.data
      })
  }
}
