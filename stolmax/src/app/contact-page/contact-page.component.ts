import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Circle, Marker, Map, } from 'leaflet';
import { LeafletService } from '../services/leaflet.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';
import { CannonicalUrlService } from '../services/cannonical-url.service';


@Component({
  selector: 'stolmax-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  standalone: true,
  providers: [LeafletService, ToastrService, CannonicalUrlService],
  imports: [CommonModule, FooterComponent, RouterModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class ContactPageComponent implements OnInit, AfterViewInit {
  private map: Map;
  private circle: Circle;
  private marker: Marker;

  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    text: new FormControl('', [Validators.required]),
  });

  private cannonicalUrlService = inject(CannonicalUrlService);
  constructor(
    private leafletService: LeafletService,
    private toastrService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
  }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cannonicalUrlService.UpdateCannonicalUrl('https://stol-max.net/kontakt');
      const title = 'KONTAKT - Stol-Max Patrycjusz Wybraniec - Meble na Wymiar | Tychy';
      const desc = 'Skontaktuj się z nami! Stol-Max w Tychach - meble na wymiar. Zadzwoń, napisz email lub odwiedź nasz zakład. Jesteśmy do Twojej dyspozycji od poniedziałku do piątku, 8:00 - 18:00.';
      this.cannonicalUrlService.UpdateTitleAndDesc(title, desc);
    }
  }


  ngAfterViewInit() {
    if (this.leafletService.L) {
      this.setupMap();
    }
  }


  public sendEmail(e: Event) {
    e.preventDefault();
    if (this.form.valid) {
      emailjs.sendForm('service_9fdtx6h', 'template_pij89ar', e.target as HTMLFormElement, 'BRSJJW5J1HN0mqzMF')
        .then((result: EmailJSResponseStatus) => {
          this.formDirective.resetForm();
          this.toastrService.success("Wiadomość została wysłana", "Udało się", { timeOut: 10000 })
        }, (error) => {
          this.toastrService.error("Wiadomość nie została wysłana. Prosimy o kontakt telefoniczny", "Błąd", { timeOut: 10000 })
        });
    }
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

    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }
}
