import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { CategorieService } from '../services/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-recette',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-recette.component.html',
  styleUrl: './edit-recette.component.css'
})
export class EditRecetteComponent implements OnInit {

  formRecette!: FormGroup;
  submitted: boolean = false;
  categories: any[] = [];
  recetteId: string = '';
  imageFile: File | null = null;
  imagePreview: string | null = null;
  imageActuelle: string = '';

  constructor(
    private fb: FormBuilder,
    private recetteService: RecetteService,
    private categorieService: CategorieService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formRecette = this.fb.group({
      nom:         ['', Validators.required],
      description: ['', Validators.required],
      ingredients: [''],
      etapes:      ['', Validators.required],
      duree:       ['', Validators.required],
      difficulte:  ['Facile'],
      categorie:   ['', Validators.required]
    });

    this.categorieService.getListCategories().subscribe(
      data => this.categories = data,
      err  => console.log(err)
    );

    this.recetteId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.recetteService.getRecetteById(this.recetteId).subscribe(
      data => {
        this.formRecette.patchValue({
          ...data,
          ingredients: data.ingredients?.join(', ') || '',
          categorie:   data.categorie?.id || data.categorie
        });
        // Sauvegarder l'image actuelle
        this.imageActuelle = data.image || '';
        if (data.image) {
          this.imagePreview = data.image;
        }
      },
      err => console.log(err)
    );
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  supprimerImage(): void {
    this.imageFile     = null;
    this.imagePreview  = null;
    this.imageActuelle = '';
  }

  submit(): void {
    this.submitted = true;
    if (this.formRecette.invalid) return;

    const formValue = this.formRecette.value;

    const formData = new FormData();
    formData.append('nom',         formValue.nom);
    formData.append('description', formValue.description);
    formData.append('etapes',      formValue.etapes);
    formData.append('duree',       formValue.duree);
    formData.append('difficulte',  formValue.difficulte);
    formData.append('categorie',   formValue.categorie);

    const ingredients = formValue.ingredients
      ? formValue.ingredients.split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];
    ingredients.forEach((ing: string) => formData.append('ingredients', ing));

    if (this.imageFile) {
      
      formData.append('image', this.imageFile);
    } else {
      
      formData.append('image', this.imageActuelle);
    }

    this.recetteService.updateRecette(this.recetteId, formData).subscribe(
      () => {
        Swal.fire({
          title: 'Mise à jour !',
          text: 'Recette modifiée avec succès.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        this.route.navigate(['liste']);
      },
      err => console.log(err)
    );
  }
}