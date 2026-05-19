import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-categorie',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-categorie.component.html',
  styleUrl: './gestion-categorie.component.css'
})
export class GestionCategorieComponent implements OnInit {

  categories: any[] = [];

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getListCategories().subscribe(
      data => this.categories = data,
      err => console.log(err)
    );
  }

  deleteCategorie(categorie: any): void {
    Swal.fire({
      title: 'Confirmer la suppression ?',
      text: `La catégorie "${categorie.nom}" sera supprimée.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.categorieService.deleteCategorie(categorie.id).subscribe(
          () => {
            this.categories = this.categories.filter(c => c.id !== categorie.id);
            Swal.fire({ title: 'Supprimée !', icon: 'success', timer: 1500, showConfirmButton: false });
          },
          err => console.log(err)
        );
      }
    });
  }
}