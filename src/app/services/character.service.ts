import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  getAllCharacterList(pageNumber) {
    const urlApi = `https://swapi.dev/api/people/?page=${pageNumber}`;

    return this.http.get(urlApi);
  }

  getAlldropDrownList(url) {
    const urlApi = url;

    return this.http.get(urlApi);
  }

  getPepoleDetails(id) {
    const url = `https://swapi.dev/api/people/${id}/`;

    return this.http.get(url);
  }
}
