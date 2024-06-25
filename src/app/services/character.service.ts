import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  speciesMap = new Map();
  filmsMap = new Map();
  vehilcesMap = new Map();
  starshipsMap = new Map();
  

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


  getFilmNameList(films) {
    if (films && films.length) {
      const filmsValue = [];
      films.forEach(ele => {
        filmsValue.push(this.filmsMap.get(ele));
      })
      return filmsValue;
    }
    else {
      return [];
    }
  }

  getVehicleList(vehicle) {
    if (vehicle && vehicle.length) {
      const vehicleValue = [];
      vehicle.forEach(ele => {
        vehicleValue.push(this.vehilcesMap.get(ele));
      })
      
      return vehicleValue;
    }
    else {
      return [];
    }
  }
  
  getStarShipList(starships) {
    if (starships && starships.length) {
      const starshipsValue = [];
      starships.forEach(ele => {
        starshipsValue.push(this.starshipsMap.get(ele));
      })
      return starshipsValue;
    }
    else {
      return [];
    }
  }
}
