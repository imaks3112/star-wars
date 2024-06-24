import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characterList = [];
  characterResult:any;
  characterId;
  movieList = [];
  speciesList = [];
  vehicleList = [];
  starShipsList = [];
   birthYearList = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
];

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCHaracterList();
  }

  async getAllCHaracterList(): Promise<void> {
    try {
      this.characterResult = await lastValueFrom(this.characterService.getAllCharacterList());
      const characterList = this.characterResult.results; 
      
      characterList.forEach(async element => {
        if (element.species && element.species?.length) {
          element.species = await this.getSpiciesName(element.species);
        }
        if (element.films && element.films?.length) {
         await this.getAllFilms(element.films);
        }
        if (element.vehicles && element.vehicles?.length) {
          await this.getAllVehicleList(element.vehicles);
         }
        if (element.starships && element.starships?.length) {
          await this.getAllStarShips(element.starships);
         }
      });

      this.characterList = characterList; 
    }
    catch(err) {
      console.log(err);
    }
  }

  async getSpiciesName(species) {
    let res;

    try {
      const speciesResult = species.map(async ele => await lastValueFrom(this.characterService.getAlldropDrownList(ele)));
      res = await Promise.allSettled(speciesResult);
      const speciesList = res.map(ele => ele.value);
      this.speciesList = [...speciesList, ...this.speciesList];
    }
    catch(err) {
      console.log(err);
    }
    return res.map(ele => ele.value?.name).join(',');
  }

  async getAllFilms(films) {
    let res;

    try {
      const filmsResult = films.map(async ele => await lastValueFrom(this.characterService.getAlldropDrownList(ele)));
      res = await Promise.allSettled(filmsResult);
     const movieList = res.map(ele => ele.value);
     this.movieList = [...movieList, ...this.movieList];
    }
    catch(err) {
      console.log(err);
    }
  }

  async getAllVehicleList(vehicles) {
    let res;

    try {
      const vehiclesResult = vehicles.map(async ele => await lastValueFrom(this.characterService.getAlldropDrownList(ele)));
      res = await Promise.allSettled(vehiclesResult);
     const vehcles = res.map(ele => ele.value);
     this.vehicleList = [...vehcles, ...this.vehicleList];
    }
    catch(err) {
      console.log(err);
    }
  }

  async getAllStarShips(starShips) {
    let res;

    try {
      const starShipsResult = starShips.map(async ele => await lastValueFrom(this.characterService.getAlldropDrownList(ele)));
      res = await Promise.allSettled(starShipsResult);
      const starships = res.map(ele => ele.value);
      this.starShipsList = [...starships, ...this.starShipsList];
    }
    catch(err) {
      console.log(err);
    }
  }
  
  showFilmDetails(character:any) {
    console.log('showFilmDetails', character);
    this.router.navigate(["character/" + character.id]);
  }
}
