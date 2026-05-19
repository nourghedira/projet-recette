import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecetteService } from '../services/recette.service';
import { CategorieService } from '../services/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-recette',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './gestion-recette.component.html',
  styleUrl: './gestion-recette.component.css'
})
export class GestionRecetteComponent implements OnInit {

  recettes: any[] = [];
  recettesFiltrees: any[] = [];
  categories: any[] = [];
  recherche: string = '';
  difficulteFiltre: string = '';
  categorieFiltre: string = '';

  constructor(
    private recetteService: RecetteService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.loadListRecettes();
    this.categorieService.getListCategories().subscribe(
      data => this.categories = data,
      err  => console.log(err)
    );
  }

  loadListRecettes(): void {
    this.recetteService.getListRecettes().subscribe(
      data => {
        this.recettes = data;
        this.recettesFiltrees = data;
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
    this.recherche = '';
    this.difficulteFiltre = '';
    this.categorieFiltre = '';
    this.filtrer();
  }

  getCategorieNom(cat: any): string {
    return cat?.nom || 'Non classé';
  }

  deleteRecette(recette: any): void {
    Swal.fire({
      title: 'Confirmer la suppression ?',
      text: `La recette "${recette.nom}" sera définitivement supprimée.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.recetteService.deleteRecette(recette.id).subscribe(
          () => {
            this.recettes = this.recettes.filter(r => r.id !== recette.id);
            this.filtrer();
            Swal.fire({ title: 'Supprimée !', icon: 'success', timer: 1500, showConfirmButton: false });
          },
          err => {
            console.log(err);
            Swal.fire({ title: 'Erreur !', text: 'Une erreur est survenue.', icon: 'error' });
          }
        );
      }
    });
  }
}