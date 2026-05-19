import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecetteService } from '../services/recette.service';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  recettes: any[] = [];
  categories: any[] = [];
  recettesFiltrees: any[] = [];
  recherche: string = '';
  categorieFiltre: string = '';
  difficulteFiltre: string = '';

  constructor(
    private recetteService: RecetteService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
  
    this.recetteService.getListRecettes().subscribe(
      data => {
        this.recettes = data;
        this.recettesFiltrees = data;

        
        this.categorieService.getListCategories().subscribe(
          cats => this.categories = cats,
          err  => console.log(err)
        );
      },
      err => console.log(err)
    );
  }

  filtrer(): void {
    this.recettesFiltrees = this.recettes.filter(r => {
      const matchNom  = r.nom.toLowerCase().includes(this.recherche.toLowerCase());
      const matchDiff = this.difficulteFiltre ? r.difficulte === this.difficulteFiltre : true;

     
      const catId    = r.categorie?.id || r.categorie?._id?.toString();
      const matchCat = this.categorieFiltre ? catId === this.categorieFiltre : true;

      return matchNom && matchDiff && matchCat;
    });
  }

  resetFiltres(): void {
    this.recherche      = '';
    this.categorieFiltre = '';
    this.difficulteFiltre = '';
    this.filtrer();
  }

  getCategorieNom(cat: any): string {
    return cat?.nom || 'Non classé';
  }

  getNombreRecettesParCat(catId: string): number {
    return this.recettes.filter(r => {
      const id = r.categorie?.id || r.categorie?._id?.toString();
      return id === catId;
    }).length;
  }

  getNombreFacile(): number {
    return this.recettes.filter(r => r.difficulte === 'Facile').length;
  }
}