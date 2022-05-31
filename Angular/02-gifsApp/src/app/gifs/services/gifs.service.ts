import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = []

  get historial() {
    return [...this._historial]
  }

  private servicioUrl: string = 'http://api.giphy.com/v1/gifs'
  private apiKeyGiphy: string =  'uCP4hsdj95il9vgU2C89D6OR1oQBcryP'

  public resultados: Gif[] = []

  constructor (private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase()
    if (query.trim().length === 0) { return }

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.slice(0, 9)
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('api_key', this.apiKeyGiphy)
      .set('limit', 10)
      .set('q', query)

    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe(resp => {
        this.resultados = resp.data
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
  }
}
