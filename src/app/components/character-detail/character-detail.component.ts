import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent {
  base64Image: string = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Dglobe%2BIcon&psig=AOvVaw06v89Z9iyy0hgZwFGX4h-F&ust=1719222811123000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCICg8qu68YYDFQAAAAAdAAAAABAE';
  films:any;
  vehicleList;
  starsipList;
  characterId;
  peopleDetails;

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.characterId = params["id"];
      this.getPepoleDetails();
    });
  }
  
  getPepoleDetails() {
    this.characterService.getPepoleDetails(this.characterId).subscribe(res => {
      this.peopleDetails = res;
      this.films = this.characterService.getFilmNameList(this.peopleDetails.films)
      this.vehicleList = this.characterService.getVehicleList(this.peopleDetails.vehicles)
      this.starsipList = this.characterService.getStarShipList(this.peopleDetails.starships)
    });
  }

  onClose() {
    this.router.navigate(['/']);
  }
}
