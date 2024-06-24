import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent {
  base64Image: string = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Dglobe%2BIcon&psig=AOvVaw06v89Z9iyy0hgZwFGX4h-F&ust=1719222811123000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCICg8qu68YYDFQAAAAAdAAAAABAE'; // Truncated for brevity

  characterList = [
    {
      id: 1,
      charcter: 'Akshay',
      spacies: 'Species Name 1',
      bYear: 'AA101',
    },
  ];

  films:any;
  characterId;

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.characterService.getAllCharacterList().subscribe(res => {
    //   console.log('res', res);
    //   this.films = res;
      
    // });

    this.route.params.subscribe((params) => {
      this.characterId = params["id"];
      this.getPepoleDetails();
    });
    
  }
  
  getPepoleDetails() {
    this.characterService.getPepoleDetails(this.characterId).subscribe(res => {
      console.log('details', res);
    });
  }

  onClose() {
    console.log('close button');
  }
}
