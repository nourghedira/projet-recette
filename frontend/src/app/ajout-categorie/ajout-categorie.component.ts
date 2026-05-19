import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-categorie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ajout-categorie.component.html',
  styleUrl: './ajout-categorie.component.css'
})
export class AjoutCategorieComponent implements OnInit {

  formCategorie!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formCategorie = this.fb.group({
      nom:         ['', Validators.required],
      description: ['']
    });
  }

  submit(): void {
    this.submitted = true;
    if (this.formCategorie.invalid) return;

    this.categorieService.postCategorie(this.formCategorie.value).subscribe(
      data => {
        Swal.fire({ title: 'Créée !', text: 'Catégorie ajoutée.', icon: 'success', timer: 1500, showConfirmButton: false });
        this.route.navigate(['/categories']);
      },
      err => console.log(err)
    );
  }
}