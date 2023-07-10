import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Circle, Marker, Map, Polygon, circle, latLng, tileLayer } from 'leaflet';
import { LeafletService } from '../services/leaflet.service';


@Component({
  selector: 'stolmax-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  standalone: true,
  providers: [LeafletService],
  imports: [CommonModule, FooterComponent, RouterModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class ContactPageComponent implements AfterViewInit {
  private map: Map;
  private circle: Circle;
  private marker: Marker;

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    text: new FormControl('', [Validators.required]),
  });

  constructor(private leafletService: LeafletService) {
  }


  ngAfterViewInit() {
    if (this.leafletService.L) {
      this.setupMap();
    }
  }

  public submit() {
    console.log(this.form.getRawValue());
  }

  private setupMap() {
    // Create the map in the #map container
    this.map = this.leafletService.L.map('map').setView([50.1196, 18.9632], 17);

    // Add a tilelayer
    this.leafletService.L.tileLayer(
      'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      {
        attribution:
          'copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>,' +
          ' Tiles courtesy of <a href="https://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
      }
    ).addTo(this.map);

    this.circle = this.leafletService.L.circle([50.11945, 18.9632], {
      color: '#68bd45',
      fillColor: '#68bd45',
      fillOpacity: 0.5,

      radius: 10
    }).addTo(this.map);

    this.circle.bindPopup('ul. Chałupnicza 3,<br> 43-100 Tychy').openPopup();
  }
}
