import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Housing} from '../housing';
import {HousingLocationInfo} from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo" [src]="housingLocation?.photo" crossorigin
        />
        <section class="listing-description">
          <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
          <p>{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
        </section>
        <section class="listing-features">
          <h2 class="section-heading">About this housing location</h2>
          <ul>
            <li>Units available: {{ housingLocation?.availableUnits }}</li>
            <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
            <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
          </ul>
        </section>
        <!-- FORM -->
        <section class="listing-apply">
          <h2>
            <!--The template now includes an event handler (submit)="submitApplication()"-->
            <form [formGroup]="applyForm" (submit)="submitApplication()">
              <label for="first-name">First Name</label>
              <input id="first-name" type="text" formControlName="firstName" />

              <label for="last-name">Last Name</label>
              <input id="last-name" type="text" formControlName="lastName" />

              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" />

              <button type="submit" class="primary">Apply now</button>
            </form>
          </h2>
          
        </section>
    </article>
  `,
  styleUrls: ['./details.css'],
})


export class Details {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(Housing);
  housingLocation: HousingLocationInfo | undefined;

  //In Angular, FormGroup and FormControl are types that enable you to build forms
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
      this.changeDetectorRef.markForCheck();
    });
  }
  
  submitApplication() {
    this.housingService.submitApplication(
      //uses the nullish coalescing operator to default to empty string if the value is null
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

}
