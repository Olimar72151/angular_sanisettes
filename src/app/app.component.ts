// Ajouter OnInit pour effectuer des opérations à l'initialisation du composant.
import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as L from 'leaflet';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


// Implémenter OnInit
export class AppComponent implements OnInit {

constructor(private httpClient: HttpClient){}
  
 
// Fonction d'initialisation du composant.
ngOnInit() {

  // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
  const myfrugalmap = L.map('frugalmap').setView([48.859488640828665, 2.3419403940112655], 12);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: 'Arthur Cheung'
  }).addTo(myfrugalmap);

  const myIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
  });
  
  function doesitexist(data: any) {
    let result;
    if (data === undefined ){
      result = ' ';
    } else {
      result = data;
    }
    return result;
  }
  //https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=551&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe
  this.httpClient.get('http://localhost:30000/toilet').subscribe((data: any) => {
    data.forEach((sanisettesparis: any) => {
      L.marker([sanisettesparis.geometry.coordinates[1], sanisettesparis.geometry.coordinates[0]], 
        {icon: myIcon}).bindPopup( "Arrondissement : " + sanisettesparis.fields.arrondissement + '</br>' + "Adresse : " + doesitexist(sanisettesparis.fields.adresse)).addTo(myfrugalmap).openPopup();;
    });
  });
  
  }

}


