import { Injectable } from '@angular/core';
import { HousingLocationInfo } from './housing-location';

@Injectable({
  providedIn: 'root',
})
export class Housing {
  
  url = 'http://localhost:3000/locations';

  constructor() {}

  async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getLocationById(id: number) : Promise<HousingLocationInfo | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const locationJson = await data.json();
    return locationJson[0] ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName,lastName,email);
  }
}
