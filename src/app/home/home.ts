import { ChangeDetectorRef,Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housing-location';
import { Housing } from '../housing';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    HousingLocation
  ],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <!-- We can either use the @for (housingLocation of filteredLocationList; track $index) {} on the Angular 17 -->
      <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation" />
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  housingLocationList: HousingLocationInfo[] = [];
  housingService: Housing = inject(Housing);
  filteredLocationList: HousingLocationInfo[] = [];



  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocationInfo[]) => {
    this.housingLocationList = housingLocationList;
    this.filteredLocationList =  this.housingLocationList;
    this.changeDetectorRef.markForCheck();
    });
  }

  filterResults(text :string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }  
}

