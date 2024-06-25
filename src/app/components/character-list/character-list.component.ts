import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  filterItemForm: FormGroup;
  characterResult: any;
  characterId;
  characterList = [];
  movieList = [];
  speciesList = [];
  vehicleList = [];
  starShipsList = [];
  birthYearList = [];
  cloneChracterList;
  disablePrevButton = true;
  disableNextButton = false;

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createFilterForm();
    this.getAllCHaracterList();
  }

  createFilterForm() {
    this.filterItemForm = this.fb.group({
      movieName: [],
      speciedName: [],
      vehicleName: [],
      starShipName: [],
      birthYear: [],
    });
  }

  filterData() {
    const formValue = this.filterItemForm.value;

    if (formValue.birthYear) {
      const filterRows = this.characterList.filter((item) =>
        item.birth_year
          ?.toLowerCase()
          .includes(formValue?.birthYear?.birth_year?.toLowerCase())
      );
      this.characterList = filterRows;
    }
  }

  clearBirthYear() {
    this.characterList = this.cloneChracterList;
  }

  async getAllCHaracterList(): Promise<void> {
    try {
      this.characterResult = await lastValueFrom(
        this.characterService.getAllCharacterList(1)
      );
      this.setCharacterListData();
    } catch (err) {
      console.log(err);
    }
  }

  async getSpiciesName(species) {
    let res;

    try {
      const speciesResult = species.map(
        async (ele) =>
          await lastValueFrom(this.characterService.getAlldropDrownList(ele))
      );
      res = await Promise.allSettled(speciesResult);
      const speciesList = res.map((ele) => ele.value);
      
      speciesList.forEach(e => {
        if (this.characterService.speciesMap.has(e.url)) {
          this.characterService.speciesMap.set(e.url, e);
        }
      })
      
      this.speciesList = [...speciesList, ...this.speciesList];
    } catch (err) {
      console.log(err);
    }
  }

  async getAllFilms(films) {
    let res;

    try {
      const filmsResult = films.map(
        async (ele) =>
          await lastValueFrom(this.characterService.getAlldropDrownList(ele))
      );
      res = await Promise.allSettled(filmsResult);
      const movieList = res.map((ele) => ele.value);
      movieList.forEach(e => {
        if (this.characterService.filmsMap.has(e.url)) {
          this.characterService.filmsMap.set(e.url, e);
        }
      })
      
      this.movieList = [...movieList, ...this.movieList];
    } catch (err) {
      console.log(err);
    }
  }

  async getAllVehicleList(vehicles) {
    let res;

    try {
      const vehiclesResult = vehicles.map(
        async (ele) =>
          await lastValueFrom(this.characterService.getAlldropDrownList(ele))
      );
      res = await Promise.allSettled(vehiclesResult);
      const vehclesList = res.map((ele) => ele.value);
      vehclesList.forEach(e => {
        if (this.characterService.vehilcesMap.has(e.url)) {
          this.characterService.vehilcesMap.set(e.url, e);
        }
      })
      
      this.vehicleList = [...vehclesList, ...this.vehicleList];
    } catch (err) {
      console.log(err);
    }
  }

  async getAllStarShips(starShips) {
    let res;

    try {
      const starShipsResult = starShips.map(
        async (ele) =>
          await lastValueFrom(this.characterService.getAlldropDrownList(ele))
      );
      res = await Promise.allSettled(starShipsResult);
      const starshipsList = res.map((ele) => ele.value);

      starshipsList.forEach(e => {
        if (this.characterService.starshipsMap.has(e.url)) {
          this.characterService.starshipsMap.set(e.url, e);
        }
      })
      
      this.starShipsList = [...starshipsList, ...this.starShipsList];
    } catch (err) {
      console.log(err);
    }
  }

  showFilmDetails(character: any) {
    const url = character.url.split('/');
    const characcterId = url[url.length - 2];
    this.router.navigate(['character/' + characcterId]);
  }

  getSpeicesNameList(species) {
    if (species && species.length) {
      const speciesValue = [];
      species.forEach(ele => {
        speciesValue.push(this.characterService.speciesMap.get(ele));
      })
      return speciesValue.map((ele) => ele?.value?.name).join(',');
    }
    else {
      return null;
    }
  }



  setCharacterListData() {
    const characterList = this.characterResult.results;
    characterList.forEach(async (element) => {
      if (element.species && element.species?.length) {
        const nonExistSpeciesInMap = [];
        element.species.forEach(e => {
          if (!this.characterService.speciesMap.has(e)) {
            this.characterService.speciesMap.set(e, null);
            nonExistSpeciesInMap.push(e);
          }
        })
        await this.getSpiciesName(nonExistSpeciesInMap);
        element.species = this.getSpeicesNameList(element.species);
      }
      if (element.films && element.films?.length) {
        const nonExistFilmsInMap = [];
        element.films.forEach(e => {
          if (!this.characterService.filmsMap.has(e)) {
            this.characterService.filmsMap.set(e, null);
            nonExistFilmsInMap.push(e);
          }
        })
        await this.getAllFilms(nonExistFilmsInMap);

      }
      if (element.vehicles && element.vehicles?.length) {
        const nonExistVehiclesInMap = [];
        element.vehicles.forEach(e => {
          if (!this.characterService.vehilcesMap.has(e)) {
            this.characterService.vehilcesMap.set(e, null);
            nonExistVehiclesInMap.push(e);
          }
        })
        await this.getAllVehicleList(nonExistVehiclesInMap);
      }
      if (element.starships && element.starships?.length) {
        const nonExistStarShipsInMap = [];
        element.starships.forEach(e => {
          if (!this.characterService.starshipsMap.has(e)) {
            this.characterService.starshipsMap.set(e, null);
            nonExistStarShipsInMap.push(e);
          }
        })
        await this.getAllStarShips(nonExistStarShipsInMap);
      }
    });

    this.characterList = characterList;
    this.cloneChracterList = characterList;
    this.birthYearList = characterList;
  }

  async previousClick() {
    try {
      const pageNumber = this.characterResult.previous.split('=').pop();
      this.characterResult = await lastValueFrom(
        this.characterService.getAllCharacterList(pageNumber[0])
      );
      this.disablePrevButton = !this.characterResult.previous;
      this.setCharacterListData();
    } catch (error) {
      console.log(error);
    }
  }

  async nextClick() {
    try {
      const pageNumber = this.characterResult.next.split('=').pop();
      this.characterResult = await lastValueFrom(
        this.characterService.getAllCharacterList(pageNumber[0])
      );
      this.disableNextButton = !this.characterResult.next;
      this.disablePrevButton = !this.characterResult.previous;
      this.setCharacterListData();
    } catch (error) {
      console.log(error);
    }
  }
}
